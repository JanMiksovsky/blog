import assert from "node:assert";
import test from "node:test";
import thread from "../thread.js";

test("thread", async () => {
  test("paragraphs to statuses", async () => {
    const markdown = `Hello

world`;
    const statuses = await thread(markdown);
    assert.deepEqual(statuses, [
      {
        status: "Hello",
      },
      {
        status: "world",
      },
    ]);
  });

  test("last link to end", async () => {
    const markdown = `Here is a [link](https://example.com).`;
    const statuses = await thread(markdown);
    assert.deepEqual(statuses, [
      {
        status: "Here is a link. https://example.com",
      },
    ]);
  });

  test("multiple links", async () => {
    const markdown = `Here is [one](https://example.com/1) and [two](https://example.com/2).`;
    const statuses = await thread(markdown);
    assert.deepEqual(statuses, [
      {
        status:
          "Here is one (https://example.com/1) and two. https://example.com/2",
      },
    ]);
  });
});
