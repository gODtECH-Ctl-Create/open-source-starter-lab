import assert from "node:assert/strict";

import {
  formatContributorTimeline,
  parseContributorTimeline
} from "../src/plugins/timeline.js";

const passport = `
## Verified Contributions

| PR | Date | Skill | Work | Linked issues |
| --- | --- | --- | --- | --- |
| #42 | 2026-09-12 | docs | Fourth contribution | #4 |
| #7 | 2026-09-01 | testing | First contribution | #1 |
| #18 | 2026-09-05 | cli | Second contribution | #2 |
| invalid | 2026-09-06 | docs | Ignore this row | #3 |
| #33 | 2026-09-10 | docs | Third contribution | #3 |
| #51 | 2026-09-14 | testing | Fifth contribution | #5 |
| #60 | 2026-09-15 | cli | Sixth contribution | #6 |
`;

const entries = parseContributorTimeline(passport);

assert.deepEqual(entries, [
  {
    prNumber: 7,
    date: "2026-09-01",
    title: "First contribution"
  },
  {
    prNumber: 18,
    date: "2026-09-05",
    title: "Second contribution"
  },
  {
    prNumber: 33,
    date: "2026-09-10",
    title: "Third contribution"
  },
  {
    prNumber: 42,
    date: "2026-09-12",
    title: "Fourth contribution"
  },
  {
    prNumber: 51,
    date: "2026-09-14",
    title: "Fifth contribution"
  }
]);

assert.equal(
  formatContributorTimeline("example-user", entries),
  [
    "@example-user first merged PR timeline",
    "",
    "● 2026-09-01  #7  First contribution",
    "│",
    "● 2026-09-05  #18  Second contribution",
    "│",
    "● 2026-09-10  #33  Third contribution",
    "│",
    "● 2026-09-12  #42  Fourth contribution",
    "│",
    "● 2026-09-14  #51  Fifth contribution"
  ].join("\n")
);

assert.equal(
  formatContributorTimeline("new-user", []),
  [
    "@new-user first merged PR timeline",
    "",
    "No verified merged pull requests found for this contributor."
  ].join("\n")
);

console.log("Contributor timeline tests passed.");
