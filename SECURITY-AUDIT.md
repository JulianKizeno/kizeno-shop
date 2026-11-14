# Security review — 2026-11-14

This is a partial remediation, not a certification that the repository is free of vulnerabilities. Changes remain in a draft pull request pending review.

## client

npm findings before: {"info": 0, "low": 9, "moderate": 129, "high": 69, "critical": 18, "total": 225}. After remediation: {"info": 0, "low": 8, "moderate": 129, "high": 45, "critical": 0, "total": 182}.
Counts refer to dependency findings in this project, including development dependencies. Projects without a committed lockfile were first resolved to create an auditable baseline. Production builds were checked on Node.js 24 with CI=true, npm ci --ignore-scripts --legacy-peer-deps and NODE_OPTIONS=--openssl-legacy-provider for legacy Webpack compatibility; these builds are not browser end-to-end tests.

Production build/test result: `{   "project": "kizeno-shop/client",   "install_exit": 0,   "build_exit": 0 }`.

### Remaining advisories

- `@testing-library/jest-dom`: high; requires dependency migration. 
- `axios`: high; requires dependency migration. https://github.com/advisories/GHSA-3g43-6gmg-66jw https://github.com/advisories/GHSA-3p68-rc4w-qgx5 https://github.com/advisories/GHSA-43fc-jf86-j433 https://github.com/advisories/GHSA-4w2v-q235-vp99 https://github.com/advisories/GHSA-5c9x-8gcm-mpgx https://github.com/advisories/GHSA-62hf-57xw-28j9 https://github.com/advisories/GHSA-6chq-wfr3-2hj9 https://github.com/advisories/GHSA-7q8q-rj6j-mhjq https://github.com/advisories/GHSA-898c-q2cr-xwhg https://github.com/advisories/GHSA-cph5-m8f7-6c5x https://github.com/advisories/GHSA-fvcv-3m26-pcqx https://github.com/advisories/GHSA-hfxv-24rg-xrqf https://github.com/advisories/GHSA-j5f8-grm9-p9fc https://github.com/advisories/GHSA-jr5f-v2jv-69x6 https://github.com/advisories/GHSA-m7pr-hjqh-92cm https://github.com/advisories/GHSA-mmx7-hfxf-jppx https://github.com/advisories/GHSA-p92q-9vqr-4j8v https://github.com/advisories/GHSA-pf86-5x62-jrwf https://github.com/advisories/GHSA-pjwm-pj3p-43mv https://github.com/advisories/GHSA-pmwg-cvhr-8vh7 https://github.com/advisories/GHSA-vf2m-468p-8v99 https://github.com/advisories/GHSA-w9j2-pvgh-6h63 https://github.com/advisories/GHSA-wf5p-g6vw-rhxx https://github.com/advisories/GHSA-xhjh-pmcv-23jw https://github.com/advisories/GHSA-xx6v-rp6x-q39c
- `react-scripts`: high; requires dependency migration. 

Do not treat compatible lockfile updates as completion of the framework migrations above.

## server

npm findings before: {"info": 0, "low": 7, "moderate": 11, "high": 23, "critical": 6, "total": 47}. After remediation: {"info": 0, "low": 0, "moderate": 1, "high": 0, "critical": 0, "total": 1}.
Counts refer to dependency findings in this project, including development dependencies. Projects without a committed lockfile were first resolved to create an auditable baseline. Production builds were checked on Node.js 24 with CI=true, npm ci --ignore-scripts --legacy-peer-deps and NODE_OPTIONS=--openssl-legacy-provider for legacy Webpack compatibility; these builds are not browser end-to-end tests.

Real HTTP/MongoDB authentication integration tests: PASS.

Application startup and HTTP rendering smoke check: PASS.

### Remaining advisories

- `hbs`: moderate; no fix offered by npm. https://github.com/advisories/GHSA-7f5c-rpf4-86p8

Do not treat compatible lockfile updates as completion of the framework migrations above.

## Vendored dependencies

Remove committed dependency trees: `client/node_modules`, `server/node_modules`. Install from the lockfiles using npm ci (legacy projects currently require --legacy-peer-deps).
