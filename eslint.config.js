import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath, URL } from "node:url";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(includeIgnoreFile(gitignorePath), js.configs.recommended, ...ts.configs.recommended, prettier);
