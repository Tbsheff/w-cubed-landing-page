/**
 * Manufacturer CMS Migration
 *
 * Applies 5 content mutations to the production Sanity dataset:
 *  1. KSB — remove "Vertical Turbine Pumps" from keyProducts
 *  2. Pentair Fairbanks — remove "Vortex Pumps", upload new logo
 *  3. Trillium Flow — add "Grit Pumps" to keyProducts
 *  4. Trident Actuators — create new manufacturer document + logo
 *  5. siteSettings — ensure KSB ref, append Trident ref to manufacturerStrip
 *
 * Usage: npx tsx sanity/seed/migrate-manufacturers.ts
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";

// ---------------------------------------------------------------------------
// Auth — read token from Sanity CLI config
// ---------------------------------------------------------------------------
const sanityConfigPath = resolve(homedir(), ".config/sanity/config.json");
let authToken: string;
try {
  const raw = JSON.parse(readFileSync(sanityConfigPath, "utf-8"));
  authToken = raw.authToken;
  if (!authToken) throw new Error("authToken missing");
} catch (err) {
  console.error(
    "Could not read Sanity auth token from",
    sanityConfigPath,
    "\nRun `sanity login` first.",
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------
const client = createClient({
  projectId: "fj4jeges",
  dataset: "production",
  apiVersion: "2025-09-15",
  token: authToken,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function uploadImage(filePath: string, filename: string) {
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`  Uploaded ${filename} → ${asset._id}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function ref(id: string) {
  return { _type: "reference", _ref: id };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("Verifying connection...");
  const settings = await client.fetch(
    `*[_id == "siteSettings-singleton"][0]{ _id, manufacturerStrip }`,
  );
  if (!settings) {
    console.error("Could not fetch siteSettings-singleton. Aborting.");
    process.exit(1);
  }
  console.log("Connected to Sanity project fj4jeges/production\n");

  // ── 1. Patch KSB ─────────────────────────────────────────────────────────
  console.log("1. Patching KSB — remove 'Vertical Turbine Pumps'...");
  const ksb = await client.fetch(
    `*[_id == "manufacturer-ksb"][0]{ _id, keyProducts }`,
  );
  if (ksb) {
    const updated = (ksb.keyProducts as string[]).filter(
      (p) => p !== "Vertical Turbine Pumps",
    );
    await client.patch("manufacturer-ksb").set({ keyProducts: updated }).commit();
    console.log(`  keyProducts: ${JSON.stringify(updated)}`);
  } else {
    console.warn("  KSB document not found — skipping");
  }

  // ── 2. Patch Pentair Fairbanks ────────────────────────────────────────────
  console.log(
    "\n2. Patching Pentair Fairbanks — remove 'Vortex Pumps' + new logo...",
  );
  const pentair = await client.fetch(
    `*[_id == "manufacturer-pentair-fairbanks"][0]{ _id, keyProducts, logo }`,
  );
  if (pentair) {
    const updated = (pentair.keyProducts as string[]).filter(
      (p) => p !== "Vortex Pumps",
    );
    const patch = client.patch("manufacturer-pentair-fairbanks").set({ keyProducts: updated });
    if (!pentair.logo?.asset?._ref) {
      const logoRef = await uploadImage(
        resolve(homedir(), "Downloads/Pentair-Fairbanks-705x275.png"),
        "pentair-fairbanks-logo.png",
      );
      patch.set({ keyProducts: updated, logo: logoRef });
    } else {
      console.log("  Logo already uploaded — skipping");
    }
    await patch.commit();
    console.log(`  keyProducts: ${JSON.stringify(updated)}`);
  } else {
    console.warn("  Pentair Fairbanks document not found — skipping");
  }

  // ── 3. Patch Trillium Flow ────────────────────────────────────────────────
  console.log("\n3. Patching Trillium Flow — add 'Grit Pumps'...");
  const trillium = await client.fetch(
    `*[_id == "manufacturer-trillium-flow"][0]{ _id, keyProducts }`,
  );
  if (trillium) {
    const existing = trillium.keyProducts as string[];
    if (existing.includes("Grit Pumps")) {
      console.log("  'Grit Pumps' already present — skipping");
    } else {
      const updated = [...existing, "Grit Pumps"];
      await client
        .patch("manufacturer-trillium-flow")
        .set({ keyProducts: updated })
        .commit();
      console.log(`  keyProducts: ${JSON.stringify(updated)}`);
    }
  } else {
    console.warn("  Trillium Flow document not found — skipping");
  }

  // ── 4. Create Trident Actuators ───────────────────────────────────────────
  console.log("\n4. Creating Trident Actuators...");
  const existing = await client.fetch(
    `*[_id == "manufacturer-trident-actuators"][0]{ _id }`,
  );
  if (existing) {
    console.log("  Document already exists — skipping creation");
  } else {
    const tridentLogo = await uploadImage(
      resolve(homedir(), "Downloads/Trident Logo.webp"),
      "trident-logo.webp",
    );
    await client.create({
      _type: "manufacturer",
      _id: "manufacturer-trident-actuators",
      name: "Trident Actuators",
      slug: { _type: "slug", current: "trident-actuators" },
      category: "Actuators",
      specialty: "Custom Designed Actuators",
      keyProducts: ["Custom Designed Actuators"],
      website: "https://tridentactuators.com/",
      featured: false,
      order: 11,
      logo: tridentLogo,
    });
    console.log("  Created manufacturer-trident-actuators");
  }

  // ── 5. Update siteSettings manufacturerStrip ──────────────────────────────
  console.log("\n5. Updating siteSettings manufacturerStrip...");
  const strip: Array<{ _ref: string }> = settings.manufacturerStrip ?? [];
  const refs = strip.map((r) => r._ref);

  const additions: string[] = [];
  if (!refs.includes("manufacturer-ksb")) {
    additions.push("manufacturer-ksb");
  } else {
    console.log("  KSB already present in strip");
  }
  if (!refs.includes("manufacturer-trident-actuators")) {
    additions.push("manufacturer-trident-actuators");
  } else {
    console.log("  Trident Actuators already present in strip");
  }

  if (additions.length > 0) {
    let tx = client.patch("siteSettings-singleton");
    for (const id of additions) {
      tx = tx.append("manufacturerStrip", [ref(id)]);
      console.log(`  Appending ${id}`);
    }
    await tx.commit();
  }

  console.log("\nMigration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
