import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

import Snackbar from "../../../components/Snackbar";
import { useAuth } from "../../../context/Auth";

import { extractCsvData } from "../../../utils";
import { LeadsData, SnackbarArgs } from "../../../types/global";
import { saveLeadsInBulk } from "../../../api";

interface FileUploadProps {
  setLeadsData: (data: LeadsData[]) => void;
  leadsData?: LeadsData[];
  setCount: (data: number) => void;
  setLoading: (data: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setLeadsData,
  leadsData,
  setCount,
  setLoading,
}: FileUploadProps) => {
  const { userId } = useAuth();

  const [snackbar, setSnackbar] = useState<SnackbarArgs>({
    isOpen: false,
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ isOpen: false });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    // Check if the file is a CSV
    if (selectedFile && selectedFile.type === "text/csv") {
      try {
        setLoading(true);

        // Extract and parse data from the CSV file
        const data = await extractCsvData(selectedFile);

        // Combine newly uploaded data with existing leads
        const allLeads = [...data, ...(leadsData ?? [])];
        const uniqueLeadsMap = new Map<string | number, LeadsData>();

        // Use a Map to remove duplicate leads by their leadID if there is any
        allLeads.forEach((lead) => {
          uniqueLeadsMap.set(lead.leadID, lead);
        });

        const uniqueLeads = Array.from(uniqueLeadsMap.values());

        // Attach userId to each lead before saving
        // this will help us keep track of each lead and who uploaded it
        const leadsWithUserId = uniqueLeads.map((lead) => ({
          ...lead,
          userId: userId ?? "",
        }));

        setLeadsData(uniqueLeads);
        setCount(uniqueLeads.length);

        await saveLeadsInBulk({ data: leadsWithUserId });
        setSnackbar({
          isOpen: true,
          message: "Leads are successfully saved in the database",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error reading the CSV file:", error);
      }
    }

    // Reset the input value to allow re-uploading the same file if needed
    e.target.value = "";
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "unset",
            sm: "center",
          },
        }}
      >
        <input
          accept=".csv"
          id="csv-upload"
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="csv-upload">
          <Button variant="contained" component="span">
            Upload CSV
          </Button>
        </label>
        <Typography variant="body2" color="text.secondary">
          Only .csv files are supported
        </Typography>
      </Box>
      <Snackbar
        isOpen={snackbar.isOpen}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity="success"
      />
    </Box>
  );
};

export default FileUpload;
