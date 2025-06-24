import { useState } from "react";
import { Box, Button } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";

import FileUpload from "./FileUpload";
import Dashboard from "./Dashboard";
import Filters from "./Filters";

import { useAuth } from "../../context/Auth";
import { LeadFilters, LeadsData } from "../../types/global";

const Home = () => {
  const { signOut } = useAuth();
  const [leadsData, setLeadsData] = useState<LeadsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(leadsData?.length ?? 0);

  // State to track the current values selected in the filter UI (before user clicks "Apply Filters")
  const [draftFilters, setDraftFilters] = useState<LeadFilters>({
    source: "",
    interestLevel: "",
    status: "",
  });

  // State to hold the filters that are actually applied to the data fetch
  const [appliedFilters, setAppliedFilters] = useState<LeadFilters>({
    source: "",
    interestLevel: "",
    status: "",
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 15,
  });

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setLeadsData([]);
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
  };

  const handleResetFilters = () => {
    const defaultFilters: LeadFilters = {
      source: "",
      interestLevel: "",
      status: "",
    };

    setDraftFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    // Reset the leads to fetch again
    setLeadsData([]);
    // Reset to first page while keeping the same page size
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
  };

  // Check if any filters are currently applied (used to conditionally show "Reset Filters" button)
  const hasActiveFilters = Object.values(appliedFilters).some(Boolean);

  return (
    <Box height={"100vh"} width={"100vw"} display={"flex"} overflow={"hidden"}>
      <Box
        display="flex"
        flexGrow={1}
        overflow="hidden"
        flexDirection="column"
        rowGap={2}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ m: "24px 16px 8px" }}
        >
          <FileUpload
            leadsData={leadsData}
            setLeadsData={setLeadsData}
            setCount={setCount}
            setLoading={setLoading}
          />
          <Box sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}>
            <Button variant="contained" onClick={() => signOut()}>
              Sign Out
            </Button>
          </Box>
        </Box>

        {/* Filter leads */}
        <Filters
          setFilters={setDraftFilters}
          filters={draftFilters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          showReset={hasActiveFilters}
        />

        {/* Dashboard for leads */}
        <Dashboard
          leadsData={leadsData}
          setLeadsData={setLeadsData}
          setCount={setCount}
          setLoading={setLoading}
          loading={loading}
          count={count}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          filters={appliedFilters}
        />
      </Box>
    </Box>
  );
};

export default Home;
