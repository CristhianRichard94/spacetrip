import { describe, it, expect } from "vitest";
import { translations } from "./translations.js";

function collectKeyPaths(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return collectKeyPaths(value, path);
    }
    return [path];
  });
}

describe("translations", () => {
  it("declares en and es locales", () => {
    expect(Object.keys(translations).sort()).toEqual(["en", "es"]);
  });

  it("en and es share the exact same set of key paths", () => {
    const enKeys = collectKeyPaths(translations.en).sort();
    const esKeys = collectKeyPaths(translations.es).sort();
    expect(esKeys).toEqual(enKeys);
  });

  it("has no empty string values in either locale", () => {
    [translations.en, translations.es].forEach((dict) => {
      collectKeyPaths(dict).forEach((path) => {
        const value = path
          .split(".")
          .reduce((acc, segment) => acc[segment], dict);
        if (typeof value === "string") {
          expect(value.trim().length).toBeGreaterThan(0);
        }
      });
    });
  });
});
