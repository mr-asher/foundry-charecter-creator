import test from "node:test";
import assert from "node:assert/strict";

import {
  formatCompendiumScanReport,
  getLatestCompendiumScan,
  recordCompendiumScan
} from "../scripts/services/compendium-diagnostics.mjs";

test("records a sanitized, readable compendium scan summary", () => {
  recordCompendiumScan({
    stepType: "class",
    rulesets: ["2024"],
    totalMs: 123.456,
    resultCount: 12,
    packs: [{
      id: "dnd5e.classes24",
      title: "Classes (2024)",
      indexMs: 40.126,
      entries: 48,
      matches: 12,
      documentFetches: 12,
      documentMs: 70.987
    }]
  });

  assert.deepEqual(getLatestCompendiumScan(), {
    stepType: "class",
    rulesets: ["2024"],
    totalMs: 123.5,
    resultCount: 12,
    packs: [{
      id: "dnd5e.classes24",
      title: "Classes (2024)",
      indexMs: 40.1,
      entries: 48,
      matches: 12,
      documentFetches: 12,
      documentMs: 71
    }]
  });

  assert.match(formatCompendiumScanReport(), /Compendium scan: class \(2024\), 123\.5ms, 12 results/);
  assert.match(formatCompendiumScanReport(), /dnd5e\.classes24: index 40\.1ms\/48 entries, 12 matches, 12 documents\/71ms/);
});
