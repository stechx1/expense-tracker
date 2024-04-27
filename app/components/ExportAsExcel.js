import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

function ExportAsExcel(tableRef) {
  return (
    <DownloadTableExcel
      filename="users table"
      sheet="users"
      currentTableRef={tableRef?.current}
    >
      <Button
        icon={<FileExcelOutlined />}
        style={{ backgroundColor: "#0096FF", color: "white" }}
      >
        Export as Excel
      </Button>
    </DownloadTableExcel>
  );
}

export default ExportAsExcel;
