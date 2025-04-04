import { normalizeString } from "../normalizeString.util";

describe("normalizeString", () => {
  it("devrait supprimer les espaces en début et fin de chaîne et mettre en minuscules", () => {
    expect(normalizeString("  Hello World  ")).toBe("hello world");
  });

  it("devrait convertir une chaîne en majuscules en minuscules", () => {
    expect(normalizeString("HELLO")).toBe("hello");
  });

  it("devrait gérer les chaînes vides", () => {
    expect(normalizeString("")).toBe("");
  });

  it("devrait gérer les chaînes avec seulement des espaces", () => {
    expect(normalizeString("   ")).toBe("");
  });
});
