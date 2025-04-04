import { generateExcel } from "../excelGenerator.service";
import * as ExcelJS from "exceljs";
import * as fs from "fs";
import * as path from "path";

jest.mock("exceljs");
jest.mock("fs");
jest.mock("path");

describe("excelGenerator.service", () => {
  describe("generateExcel", () => {
    it("should generate an Excel file with the provided data", async () => {
      // Mock setup
      const mockWriteFile = jest.fn().mockResolvedValue(undefined);
      const mockAddRow = jest.fn();
      const mockWorksheet = { addRow: mockAddRow };
      const mockAddWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      const mockWorkbook = {
        addWorksheet: mockAddWorksheet,
        xlsx: { writeFile: mockWriteFile },
      };

      (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);
      (path.dirname as jest.Mock).mockReturnValue("/output");
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      // Test data
      const params = {
        worksheetName: "Test Sheet",
        headers: ["Header1", "Header2"],
        data: ["Data1", "Data2"],
        outputPath: "/output/test.xlsx",
      };

      await generateExcel(params);

      expect(ExcelJS.Workbook).toHaveBeenCalled();
      expect(mockAddWorksheet).toHaveBeenCalledWith("Test Sheet");
      expect(mockAddRow).toHaveBeenCalledWith(["Header1", "Header2"]);
      expect(mockAddRow).toHaveBeenCalledWith(["Data1"]);
      expect(mockAddRow).toHaveBeenCalledWith(["Data2"]);
      expect(mockWriteFile).toHaveBeenCalledWith("/output/test.xlsx");
    });

    it("should create output directory if it does not exist", async () => {
      // Mock setup
      const mockWriteFile = jest.fn().mockResolvedValue(undefined);
      const mockAddRow = jest.fn();
      const mockWorksheet = { addRow: mockAddRow };
      const mockAddWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      const mockWorkbook = {
        addWorksheet: mockAddWorksheet,
        xlsx: { writeFile: mockWriteFile },
      };

      (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);
      (path.dirname as jest.Mock).mockReturnValue("/new-output");
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockReturnValue(undefined);

      const params = {
        worksheetName: "Test Sheet",
        headers: ["Header1"],
        data: ["Data1"],
        outputPath: "/new-output/test.xlsx",
      };

      await generateExcel(params);

      expect(fs.existsSync).toHaveBeenCalledWith("/new-output");
      expect(fs.mkdirSync).toHaveBeenCalledWith("/new-output", { recursive: true });
      expect(mockWriteFile).toHaveBeenCalledWith("/new-output/test.xlsx");
    });

    it("should handle empty data array", async () => {
      // Mock setup
      const mockWriteFile = jest.fn().mockResolvedValue(undefined);
      const mockAddRow = jest.fn();
      const mockWorksheet = { addRow: mockAddRow };
      const mockAddWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      const mockWorkbook = {
        addWorksheet: mockAddWorksheet,
        xlsx: { writeFile: mockWriteFile },
      };

      (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);
      (path.dirname as jest.Mock).mockReturnValue("/output");
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const params = {
        worksheetName: "Empty Sheet",
        headers: ["Header1", "Header2"],
        data: [],
        outputPath: "/output/empty.xlsx",
      };

      await generateExcel(params);

      expect(mockAddRow).toHaveBeenCalledWith(["Header1", "Header2"]);
      expect(mockAddRow).toHaveBeenCalledTimes(1); // Only headers, no data rows
      expect(mockWriteFile).toHaveBeenCalledWith("/output/empty.xlsx");
    });

    it("should handle file write errors", async () => {
      // Mock setup
      const mockError = new Error("Write failed");
      const mockWriteFile = jest.fn().mockRejectedValue(mockError);
      const mockAddRow = jest.fn();
      const mockWorksheet = { addRow: mockAddRow };
      const mockAddWorksheet = jest.fn().mockReturnValue(mockWorksheet);
      const mockWorkbook = {
        addWorksheet: mockAddWorksheet,
        xlsx: { writeFile: mockWriteFile },
      };

      (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);
      (path.dirname as jest.Mock).mockReturnValue("/output");
      (fs.existsSync as jest.Mock).mockReturnValue(true);

      const params = {
        worksheetName: "Error Sheet",
        headers: ["Header"],
        data: ["Data"],
        outputPath: "/output/error.xlsx",
      };

      await expect(generateExcel(params)).rejects.toEqual(mockError);
    });
  });
});
