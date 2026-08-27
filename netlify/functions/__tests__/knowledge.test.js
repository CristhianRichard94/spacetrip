// @vitest-environment node
import { describe, it, expect } from "vitest";
import { RESUME_CONTEXT } from "../knowledge.js";

describe("knowledge RESUME_CONTEXT", () => {
  it("exports a non-empty trimmed string", () => {
    expect(typeof RESUME_CONTEXT).toBe("string");
    expect(RESUME_CONTEXT.length).toBeGreaterThan(0);
    expect(RESUME_CONTEXT).toBe(RESUME_CONTEXT.trim());
  });

  it("mentions the candidate's name and contact email", () => {
    expect(RESUME_CONTEXT).toContain("Cristhian Richard");
    expect(RESUME_CONTEXT).toContain("richardcristhian94@gmail.com");
  });
});
