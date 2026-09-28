import { test } from "node:test";
import assert from "node:assert/strict";
import { IDEA_MAX, validateWaitlist } from "./waitlist.ts";

test("validateWaitlist", () => {
  assert.deepEqual(validateWaitlist({ email: "founder@makevia.in", idea: "" }), {});
  assert.deepEqual(validateWaitlist({ email: "a.b+c@mail.co.in", idea: "Protein chips" }), {});
  assert.ok(validateWaitlist({ email: "", idea: "" }).email);
  for (const bad of ["plain", "a@b", "a@b.", "a @b.com", "a@@b.com", "a@b..com", "a@.com"]) {
    assert.ok(validateWaitlist({ email: bad, idea: "" }).email, bad);
  }
  assert.ok(validateWaitlist({ email: "x@y.com", idea: "a".repeat(IDEA_MAX + 1) }).idea);
});
