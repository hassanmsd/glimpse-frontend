import { LeadsData } from "../types/global";

// convert string to camel cases
const toCamelCase = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|\-|\_)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "")
    .replace(/[\-_]+/g, "");
};

// Function to parse and extract data from the CSV file
const extractCsvData = (file: File): Promise<LeadsData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const text = reader.result as string;
        const rows = text.split("\n").map((row) => row.split(","));

        // The first row is the headers
        const headers = rows[0];

        // Normalize headers to camelCase
        const normalizedHeaders = headers.map((header) =>
          toCamelCase(header.trim())
        );

        // Map the remaining rows into an array of SalesData objects
        const data: LeadsData[] = rows.slice(1).map((row) => {
          const rowData: Partial<LeadsData> = {};
          row.forEach((cell, index) => {
            const header = normalizedHeaders[index];
            rowData[header as keyof LeadsData] = cell.trim();
          });
          return rowData as LeadsData;
        });

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

export { toCamelCase, extractCsvData };
