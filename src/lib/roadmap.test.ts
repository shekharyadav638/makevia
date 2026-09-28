import { test } from "node:test";
import assert from "node:assert/strict";
import { groupProviders, type Provider } from "./roadmap.ts";

const p = (id: number, service: Provider["service"]): Provider => ({
  id, name: `P${id}`, service, city: null, state: null, description: null, website: null, verified: false,
});

test("groupProviders", () => {
  const groups = groupProviders([p(1, "packaging"), p(2, "manufacturing"), p(3, "packaging"), p(4, "packaging"), p(5, "packaging")]);
  assert.deepEqual(groups.packaging?.map((x) => x.id), [1, 3, 4]);
  assert.deepEqual(groups.manufacturing?.map((x) => x.id), [2]);
  assert.equal(groups.logistics, undefined);
  assert.deepEqual(groupProviders([]), {});
});
