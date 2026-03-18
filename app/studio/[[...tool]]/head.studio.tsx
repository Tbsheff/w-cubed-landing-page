import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";

const viewportContent = [
  studioViewport.width ? `width=${studioViewport.width}` : null,
  studioViewport.initialScale ? `initial-scale=${studioViewport.initialScale}` : null,
  studioViewport.viewportFit ? `viewport-fit=${studioViewport.viewportFit}` : null,
]
  .filter(Boolean)
  .join(", ");

export default function StudioHead() {
  return (
    <>
      <meta name="referrer" content={studioMetadata.referrer} />
      <meta name="robots" content={studioMetadata.robots} />
      <meta name="viewport" content={viewportContent} />
    </>
  );
}
