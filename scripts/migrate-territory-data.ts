/**
 * Migration script to move hardcoded territory data into Sanity CMS
 *
 * Usage:
 *   pnpm tsx scripts/migrate-territory-data.ts --dry-run  # Preview without creating
 *   pnpm tsx scripts/migrate-territory-data.ts            # Actually create documents
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

// Hardcoded data from territory-split-map.tsx
const STATE_CODES = {
  '16': { code: 'ID', name: 'Idaho', repId: 'austin' },
  '32': { code: 'NV', name: 'Nevada', repId: 'brad' },
  '49': { code: 'UT', name: 'Utah', repId: 'brad' },
  '56': { code: 'WY', name: 'Wyoming', repId: 'austin' },
} as const

const SERVED_COUNTIES: Record<string, Set<string>> = {
  NV: new Set(['elko', 'eureka', 'white pine']),
  ID: new Set([
    'ada', 'adams', 'bannock', 'bear lake', 'bingham', 'blaine', 'boise',
    'bonneville', 'butte', 'camas', 'canyon', 'caribou', 'cassia', 'clark',
    'custer', 'elmore', 'franklin', 'fremont', 'gem', 'gooding', 'idaho',
    'jefferson', 'jerome', 'lemhi', 'lincoln', 'madison', 'minidoka',
    'oneida', 'owyhee', 'payette', 'power', 'teton', 'twin falls', 'valley',
    'washington',
  ]),
  WY: new Set([
    'park', 'hot springs', 'fremont', 'sweetwater', 'teton', 'lincoln',
    'sublette', 'uinta',
  ]),
}

const REP_INFO = {
  brad: {
    id: 'brad',
    name: 'Brad Gwinnup',
    email: 'Bradg@wcubedinc.com',
    phone: '801-232-8241',
  },
  austin: {
    id: 'austin',
    name: 'Austin Gwinnup',
    email: 'Austing@wcubedinc.com',
    phone: '801-803-8558',
  },
} as const

interface CountyData {
  name: string
  stateCode: string
  stateName: string
  fipsCode: string
  served: boolean
  repId?: string
}

interface ValidationReport {
  totalCounties: number
  servedCounties: number
  matchedCounties: number
  unmatchedCounties: string[]
  counties: CountyData[]
}

async function loadTopologyData(): Promise<any> {
  console.log('📍 Loading US Atlas topology data...')
  const topoModule = await import('us-atlas/counties-10m.json')
  const topoJson = topoModule.default as any
  const topoClient = await import('topojson-client')
  const { feature } = topoClient

  const countyCollection = feature(
    topoJson,
    topoJson.objects.counties
  ) as any

  return countyCollection
}

function extractCountiesFromTopology(countyCollection: any): CountyData[] {
  const counties: CountyData[] = []

  for (const featureItem of countyCollection.features) {
    if (!featureItem.geometry) continue

    const idValue = String(featureItem.id ?? '')
    const normalized = idValue.padStart(5, '0')
    const stateFips = normalized.slice(0, 2)

    if (!(stateFips in STATE_CODES)) continue

    const countyName = String(featureItem.properties?.name ?? '')
    if (!countyName) continue

    const stateEntry = STATE_CODES[stateFips as keyof typeof STATE_CODES]
    const isServed = isCountyServed(stateEntry.code, countyName)

    counties.push({
      name: countyName,
      stateCode: stateEntry.code,
      stateName: stateEntry.name,
      fipsCode: normalized,
      served: isServed,
      repId: isServed ? stateEntry.repId : undefined,
    })
  }

  return counties
}

function isCountyServed(stateCode: string, countyName: string): boolean {
  if (stateCode === 'UT') {
    return true // All Utah counties served
  }

  const servedSet = SERVED_COUNTIES[stateCode]
  if (!servedSet) return false

  return servedSet.has(countyName.trim().toLowerCase())
}

function generateValidationReport(counties: CountyData[]): ValidationReport {
  const servedCounties = counties.filter(c => c.served)

  // Check for any hardcoded counties that weren't matched
  const unmatchedCounties: string[] = []

  for (const [stateCode, countySet] of Object.entries(SERVED_COUNTIES)) {
    for (const countyName of countySet) {
      const found = counties.find(
        c => c.stateCode === stateCode &&
             c.name.toLowerCase() === countyName.toLowerCase()
      )
      if (!found) {
        unmatchedCounties.push(`${countyName} (${stateCode})`)
      }
    }
  }

  return {
    totalCounties: counties.length,
    servedCounties: servedCounties.length,
    matchedCounties: servedCounties.length - unmatchedCounties.length,
    unmatchedCounties,
    counties,
  }
}

function printValidationReport(report: ValidationReport) {
  console.log('\n📊 VALIDATION REPORT')
  console.log('═'.repeat(60))
  console.log(`Total Counties (UT, ID, NV, WY): ${report.totalCounties}`)
  console.log(`Served Counties: ${report.servedCounties}`)
  console.log(`Matched Counties: ${report.matchedCounties}`)

  if (report.unmatchedCounties.length > 0) {
    console.log(`\n⚠️  UNMATCHED COUNTIES: ${report.unmatchedCounties.length}`)
    report.unmatchedCounties.forEach(county => {
      console.log(`   - ${county}`)
    })
  } else {
    console.log('\n✅ All hardcoded counties matched successfully!')
  }

  // Show breakdown by state
  console.log('\n📍 Breakdown by State:')
  const byState = report.counties.reduce((acc, county) => {
    if (!acc[county.stateCode]) {
      acc[county.stateCode] = { total: 0, served: 0 }
    }
    acc[county.stateCode].total++
    if (county.served) acc[county.stateCode].served++
    return acc
  }, {} as Record<string, { total: number; served: number }>)

  Object.entries(byState)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([state, counts]) => {
      console.log(`   ${state}: ${counts.served} served / ${counts.total} total`)
    })

  console.log('═'.repeat(60))
}

async function createSanityDocuments(
  counties: CountyData[],
  dryRun: boolean = false
) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-15',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  })

  if (!process.env.SANITY_API_TOKEN) {
    console.error('\n❌ ERROR: SANITY_API_TOKEN environment variable not set')
    console.error('   Please set your Sanity write token to continue')
    process.exit(1)
  }

  console.log(`\n${dryRun ? '🔍 DRY RUN MODE' : '🚀 CREATING DOCUMENTS'}`)
  console.log('═'.repeat(60))

  // Step 1: Create salespeople
  console.log('\n👥 Creating salespeople...')
  const salespeopleIds: Record<string, string> = {}

  for (const [repId, repData] of Object.entries(REP_INFO)) {
    const docId = `salesperson-${repId}`

    if (dryRun) {
      console.log(`   [DRY RUN] Would create: ${repData.name}`)
      salespeopleIds[repId] = docId
    } else {
      try {
        const doc = await client.createOrReplace({
          _id: docId,
          _type: 'salesperson',
          name: repData.name,
          email: repData.email,
          phone: repData.phone,
          active: true,
        })
        salespeopleIds[repId] = doc._id
        console.log(`   ✅ Created: ${repData.name}`)
      } catch (error) {
        console.error(`   ❌ Failed to create ${repData.name}:`, error)
      }
    }
  }

  // Step 2: Create counties
  console.log(`\n🏛️  Creating ${counties.length} counties...`)
  let created = 0
  let failed = 0

  for (const county of counties) {
    const docId = `county-${county.fipsCode}`

    if (dryRun) {
      if (created < 5) { // Show first 5 examples in dry run
        console.log(`   [DRY RUN] Would create: ${county.name}, ${county.stateCode} (${county.fipsCode})`)
      }
      created++
    } else {
      try {
        const doc: any = {
          _id: docId,
          _type: 'county',
          name: county.name,
          stateCode: county.stateCode,
          fipsCode: county.fipsCode,
          served: county.served,
        }

        // Add salesperson reference if county is served
        if (county.served && county.repId) {
          doc.salesperson = {
            _type: 'reference',
            _ref: salespeopleIds[county.repId],
          }
        }

        await client.createOrReplace(doc)
        created++

        if (created % 50 === 0) {
          console.log(`   ✅ Created ${created}/${counties.length} counties...`)
        }
      } catch (error) {
        console.error(`   ❌ Failed to create ${county.name}:`, error)
        failed++
      }
    }
  }

  console.log(`\n${dryRun ? '📋 DRY RUN COMPLETE' : '✅ MIGRATION COMPLETE'}`)
  console.log('═'.repeat(60))
  console.log(`Salespeople: ${Object.keys(REP_INFO).length}`)
  console.log(`Counties: ${created}${failed > 0 ? ` (${failed} failed)` : ''}`)
  console.log('═'.repeat(60))
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')

  console.log('🗺️  TERRITORY DATA MIGRATION SCRIPT')
  console.log('═'.repeat(60))

  // Step 1: Load topology data
  const countyCollection = await loadTopologyData()

  // Step 2: Extract counties
  console.log('🔍 Extracting county data from topology...')
  const counties = extractCountiesFromTopology(countyCollection)

  // Step 3: Generate validation report
  const report = generateValidationReport(counties)
  printValidationReport(report)

  // Step 4: Save validation report to file
  const reportPath = path.join(process.cwd(), 'migration-validation-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📄 Full report saved to: ${reportPath}`)

  // Step 5: Prompt to continue if not dry run
  if (!dryRun && report.unmatchedCounties.length > 0) {
    console.log('\n⚠️  WARNING: Some counties were not matched.')
    console.log('   Review the report before proceeding.')
    console.log('   Run with --dry-run first to preview changes.')
  }

  // Step 6: Create Sanity documents
  await createSanityDocuments(counties, dryRun)

  console.log('\n✨ Done!')
  if (dryRun) {
    console.log('💡 Run without --dry-run to actually create documents')
  }
}

main().catch(console.error)
