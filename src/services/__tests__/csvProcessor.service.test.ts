import { processCSV } from "../csvProcessor.service";
import * as fs from "node:fs";

jest.mock("node:fs");

describe("csvProcessor.service", () => {
  describe("processCSV", () => {
    it("devrait lire un fichier CSV et retourner un tableau d'objets", async () => {
      (fs.createReadStream as jest.Mock).mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          on: jest.fn().mockImplementation(function (event, callback) {
            if (event === "data") {
              callback({ name: "Alice", age: "30" });
              callback({ name: "Bob", age: "25" });
            }
            if (event === "end") {
              callback();
            }
            // @ts-expect-error not spending time for another approach
            return this;
          }),
        }),
      });

      const result = await processCSV<{ name: string; age: string }>("test.csv");

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Alice");
      expect(result[0].age).toBe("30");
      expect(result[1].name).toBe("Bob");
      expect(result[1].age).toBe("25");
      expect(fs.createReadStream).toHaveBeenCalledWith("test.csv");
    });

    it("devrait gérer un fichier CSV vide", async () => {
      (fs.createReadStream as jest.Mock).mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          on: jest.fn().mockImplementation(function (event, callback) {
            if (event === "end") {
              callback();
            }
            // @ts-expect-error not spending time for another approach
            return this;
          }),
        }),
      });

      const result = await processCSV("empty.csv");

      expect(result).toEqual([]);
    });

    it("devrait rejeter avec une erreur si le fichier ne peut pas être lu", async () => {
      const mockError = new Error("Erreur de lecture");

      (fs.createReadStream as jest.Mock).mockReturnValue({
        pipe: jest.fn().mockReturnValue({
          on: jest.fn().mockImplementation(function (event, callback) {
            if (event === "error") {
              callback(mockError);
            }
            // @ts-expect-error not spending time for another approach
            return this;
          }),
        }),
      });

      await expect(processCSV("invalid.csv")).rejects.toEqual(mockError);
    });
  });
});
