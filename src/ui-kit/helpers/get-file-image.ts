import excel from "../images/excel-file.svg";
import pdf from "../images/pdf-file.svg";
import rar from "../images/rar-file.svg";
import word from "../images/word-file.svg";
import defaultFile from "../images/default-file.svg";


const PDF_MEDIA_TYPES = ["application/pdf", "application/x-pdf"];
const RAR_MEDIA_TYPES = ["application/x-rar-compressed", "application/vnd.rar"];
const WORD_MEDIA_TYPES = [
  "application/msword",
  "application/vnd.ms-word.document.macroEnabled.12",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-word.template.macroEnabled.12",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "application/rtf",
];
const EXCEL_MEDIA_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel.sheet.macroEnabled.12",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  "application/vnd.ms-excel.template.macroEnabled.12",
  "application/xml",
  "text/xml",
  "application/vnd.ms-excel.addin.macroEnabled.12",
  "application/excel",
  "application/vnd.ms-excel",
  "application/x-excel",
  "application/msexcel",
  "application/x-msexcel",
  "application/vnd.ms-works",
  "application/x-msworks",
];

export const getFileImageByMediaType = (mimeType: string): string => {
  switch (true) {
    case RAR_MEDIA_TYPES.includes(mimeType):
      return rar;

    case PDF_MEDIA_TYPES.includes(mimeType):
      return pdf;

    case WORD_MEDIA_TYPES.includes(mimeType):
      return word;

    case EXCEL_MEDIA_TYPES.includes(mimeType):
      return excel;

    default:
      return defaultFile;
  }
};

const PDF_FORMATS = [".pdf"];
const RAR_FORMATS = [".rar"];
const WORD_FORMATS = [".doc", ".docm", ".docx", ".dotm", ".dotx", ".rtf"];
const EXCEL_FORMATS = [
  ".xlsx",
  ".xlsm",
  ".xlsm",
  ".xltx",
  ".xltm",
  ".xls",
  ".xlt",
  ".xls",
  ".xml",
  ".xml",
  ".xlam",
  ".xla",
  ".xlw",
  ".xlr",
];

export const getFileImageByFilename = (filename: string): string => {
  const lowerCasedFilename = filename;
  const searchPredicate = (format: string) =>
    lowerCasedFilename.endsWith(format);

  switch (true) {
    case RAR_FORMATS.some(searchPredicate):
      return rar;

    case PDF_FORMATS.some(searchPredicate):
      return pdf;

    case WORD_FORMATS.some(searchPredicate):
      return word;

    case EXCEL_FORMATS.some(searchPredicate):
      return excel;

    default:
      return defaultFile;
  }
};
