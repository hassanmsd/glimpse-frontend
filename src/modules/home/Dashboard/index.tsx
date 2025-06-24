import React, { useEffect, useState } from "react";

import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

import { LeadFilters, LeadsData } from "../../../types/global";
import DataGrid from "../../../components/Grid";
import { fetchLeads } from "../../../api";
import { useAuth } from "../../../context/Auth";

import styles from "./styles.module.scss";

interface DashboardProps {
  leadsData?: LeadsData[];
  setCount: (data: number) => void;
  count: number;
  setLeadsData: (data: LeadsData[]) => void;
  setLoading: (data: boolean) => void;
  loading: boolean;
  filters: LeadFilters;
  paginationModel: GridPaginationModel;
  setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
}

const Dashboard: React.FC<DashboardProps> = ({
  leadsData,
  setLeadsData,
  setCount,
  count,
  setLoading,
  loading,
  filters,
  paginationModel,
  setPaginationModel,
}) => {
  const { userId } = useAuth();

  // columns for table
  const columns: GridColDef[] = [
    { field: "leadID", headerName: "Lead ID", width: 100 },
    { field: "leadName", headerName: "Lead Name", width: 180 },
    { field: "contactInformation", headerName: "Contact Info", width: 300 },
    { field: "source", headerName: "Source", width: 180 },
    { field: "interestLevel", headerName: "Interest Level", width: 180 },
    { field: "status", headerName: "Status", width: 180 },
    {
      field: "assignedSalesperson",
      headerName: "Assigned SalesPerson",
      width: 180,
    },
  ];

  useEffect(() => {
    const fetchBackendLeads = async () => {
      const totalFetched = leadsData?.length;

      // Determine the offset based on current page and page size
      const combinedOffset = paginationModel.page * paginationModel.pageSize;

      // If we already have enough leads for the current page, skip fetching
      if (
        leadsData &&
        leadsData.length >= combinedOffset + paginationModel.pageSize
      ) {
        return;
      }

      setLoading(true);

      const response = await fetchLeads({
        limit: paginationModel.pageSize,
        offset: totalFetched ?? 0,
        source: filters.source,
        interestLevel: filters.interestLevel,
        status: filters.status,
        userId: userId ?? "",
      });

      const newLeads: LeadsData[] = response.data;
      setCount(response.total);

      // Merge newly fetched leads with existing ones
      const allLeads = [...(leadsData ?? []), ...newLeads];
      const uniqueLeadsMap = new Map<string | number, LeadsData>();

      // Remove duplicate leads using leadID as the key if there is any
      allLeads.forEach((lead) => {
        uniqueLeadsMap.set(lead.leadID, lead);
      });

      setLeadsData(Array.from(uniqueLeadsMap.values()));
      setLoading(false);
    };

    fetchBackendLeads();
  }, [paginationModel, filters]);

  // Slice the full leads Rows list to display only rows for the current page
  const paginatedRows = leadsData
    ?.slice(
      paginationModel.page * paginationModel.pageSize,
      (paginationModel.page + 1) * paginationModel.pageSize
    )
    .map((lead) => ({
      id: lead.leadID,
      ...lead,
    }));

  return (
    <Paper
      sx={{
        flexGrow: 1,
        overflowX: "hidden",
        overflowY: "auto",
        margin: 2,
        marginTop: 0,
        borderRadius: 3,
      }}
      elevation={2}
    >
      <DataGrid
        rows={paginatedRows}
        columns={columns}
        rowCount={count}
        loading={loading}
        pageSizeOptions={[5, 10, 15, 20, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        // showing only the required rows
        paginationMode="server"
        className={styles.DocumentGrid}
        sortingOrder={["asc", "desc"]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
};

export default Dashboard;
