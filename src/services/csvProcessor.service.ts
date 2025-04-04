import * as fs from "node:fs";
import * as csv from "csv-parser";

/**
 * Reads a CSV file and returns its content as an array of objects.
 */
export async function processCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: T) => results.push(row))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
