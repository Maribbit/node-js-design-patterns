# Simple Web Spider V0

I intentionally used mkdirp 0.x because its later versions provide a different API.

This version is bad because the spider function has a poor readability. Checkout `spider.js` for this function.

# Simple Web Spider V1

Just applied these disciplines:

1. Exit as soon as possible. Use `return`, `continue` or `break`
2. Create named functions for callbacks.
3. Modualarize the code.

# Usage

Install dependencies and checkout the test script.

```bash
npm install
npm run test