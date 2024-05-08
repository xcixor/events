"use client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

type Props = {
  data: any;
};

const ExportToExcel = ({ data }: Props) => {
  const exportToExcel = () => {
    // Check if data is an array
    if (!Array.isArray(data)) {
      throw new TypeError("The data parameter must be an array");
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "data.xlsx");
  };
  return (
    <div>
      <Button onClick={exportToExcel}>Export to Excel</Button>
    </div>
  );
};

export default ExportToExcel;
