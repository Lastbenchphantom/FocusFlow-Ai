import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { contactSchema, sanitizeContactPayload } from "./validation.js";

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      message: "Interested in early access",
      website: "",
    });
    assert.equal(result.success, true);
  });

  it("rejects short names and bad emails", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "not-an-email",
    });
    assert.equal(result.success, false);
  });

  it("rejects honeypot filled fields via max 0", () => {
    const result = contactSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      website: "http://spam.example",
    });
    assert.equal(result.success, false);
  });
});

describe("sanitizeContactPayload", () => {
  it("trims and lowercases email", () => {
    const out = sanitizeContactPayload({
      name: "  Ada  ",
      email: "Ada@Example.COM",
      company: "",
      message: "  hello  ",
    });
    assert.deepEqual(out, {
      name: "Ada",
      email: "ada@example.com",
      company: null,
      message: "hello",
    });
  });
});
