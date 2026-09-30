## 2026-09-30 — Implement cartTotal logic and unit tests
Tool: Claude
Asked for: Implement `cartTotal(items, options)` based on the provided `brief.md` specification without external dependencies, and write unit tests covering the edge cases.
Kept: The core logic for calculating subtotal, VAT, and applying the free shipping threshold. 
Changed: The assistant initially suggested using `.toFixed(0)` for rounding. I changed it to `Math.round(total)` because `.toFixed()` returns a string, but the specification strictly requires returning a Number.
Rejected: The assistant's initial attempt to use `Array.prototype.reduce()` for the subtotal calculation. I rejected it because throwing `RangeError` from inside a reducer makes the code harder to read, opting for a clean `for...of` loop instead.
By hand: Set up the GitHub Actions CI workflow (`ci.yml`), `CLAUDE.md` rules file, and structured the 5 distinct test cases in `test/cart.test.js` before prompting for the implementation.