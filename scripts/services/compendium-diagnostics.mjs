let latestScan = null;

const roundMs = (value) => Math.round((value ?? 0) * 10) / 10;

export function recordCompendiumScan(scan) {
  latestScan = {
    stepType: scan.stepType,
    rulesets: [...scan.rulesets],
    totalMs: roundMs(scan.totalMs),
    resultCount: scan.resultCount,
    packs: scan.packs.map((pack) => ({
      id: pack.id,
      title: pack.title,
      indexMs: roundMs(pack.indexMs),
      entries: pack.entries,
      matches: pack.matches,
      documentFetches: pack.documentFetches,
      documentMs: roundMs(pack.documentMs)
    }))
  };
  return latestScan;
}

export function getLatestCompendiumScan() {
  return latestScan;
}

export function formatCompendiumScanReport() {
  if (!latestScan) return "Compendium scan: none recorded";
  const rulesets = latestScan.rulesets.join("+") || "none";
  return [
    `Compendium scan: ${latestScan.stepType} (${rulesets}), ${latestScan.totalMs}ms, ${latestScan.resultCount} results`,
    ...latestScan.packs.map((pack) =>
      `  ${pack.id}: index ${pack.indexMs}ms/${pack.entries} entries, ${pack.matches} matches, ${pack.documentFetches} documents/${pack.documentMs}ms`
    )
  ].join("\n");
}

export function logCompendiumScan(scan) {
  const summary = recordCompendiumScan(scan);
  console.groupCollapsed(
    `D&D Character Creator | ${summary.stepType} compendium scan: ${summary.totalMs}ms`
  );
  console.table(summary.packs);
  console.log(`${summary.resultCount} results for rulesets: ${summary.rulesets.join(", ") || "none"}`);
  console.groupEnd();
}
