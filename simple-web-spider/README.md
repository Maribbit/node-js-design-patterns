# Simple Web Spider V0

I intentionally used mkdirp 0.x because its later versions provide a different API.

This version is bad because the spider function has a poor readability. Checkout `spider.js` for this function.

# Simple Web Spider V1

Just applied these disciplines:

1. Exit as soon as possible. Use `return`, `continue` or `break`
2. Create named functions for callbacks.
3. Modualarize the code.

# Simple Web Spider V2

The function spiderLinks enables the spider to download pages recursively.
It collects all the `<a>` tags on the HTML page with the same host and download those pages.

The main problem here is how to trigger spider function on an array of URLs sequentially.
We cannot use callback pattern solely because the length of the array is unknown.

The solution here uses a resursive pattern.
Checkout the code in demo-recursive-async-iteration to understand the pattern better.

# Simple Web Spider V3

The function spiderLinks can download links faster because all the links on one page are started spidering in one event loop.

There is a racing condition to be dealt with in spider function.

There is also a simplified pattern in demo-concurrent-async-race.

# Simple Web Spider V4

Use task queue to globally limit concurrency.

Checkout demo-task-queue to test this class.

# Usage

Install dependencies and checkout the test script.

```bash
npm install
npm run test
```