import { FileExcelOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import useResponsive from "../customeHooks/useResponsive";



function ExportAsExcel(tableRef) {

     const {width} = useResponsive()
  return (
    <DownloadTableExcel
      filename="users table"
      sheet="users"
      currentTableRef={tableRef?.current}
      
    >
      <Button
        icon={<UploadOutlined/>}
        style={{ backgroundColor: "#0096FF", color: "white" }}
      
      >
    {width>768 && <span>Export as Excel</span>}
      </Button>
    </DownloadTableExcel>
  );
}

export default ExportAsExcel;
