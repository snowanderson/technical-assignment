import * as ExcelJS from "exceljs";
import * as path from "path";
import * as fs from "fs";

/**
 * Generates an Excel file with the given worksheet name, headers, and data.
 */
export const generateExcel = async ({
  worksheetName,
  headers,
  data,
  outputPath,
}: {
  worksheetName: string;
  headers: string[];
  data: string[];
  outputPath: string;
}): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  worksheet.addRow(headers);

  data.forEach((item) => worksheet.addRow([item]));

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await workbook.xlsx.writeFile(outputPath);
  return;
};
