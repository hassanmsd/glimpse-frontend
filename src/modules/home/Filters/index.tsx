import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Grid,
} from "@mui/material";

import { LeadFilters } from "../../../types/global";
import {
  LEAD_INTEREST_LEVEL,
  LEAD_STATUS,
  LEAD_SOURCE,
} from "../../../constants/global";

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<LeadFilters>>;
  filters: LeadFilters;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  showReset: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  setFilters,
  filters,
  onApplyFilters,
  onResetFilters,
  showReset,
}) => {
  const handleChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mb={2} px={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              name="source"
              value={filters.source}
              onChange={handleChange}
              label="Source"
            >
              <MenuItem value="">All</MenuItem>
              {LEAD_SOURCE.map((src) => (
                <MenuItem key={src} value={src}>
                  {src}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Interest Level</InputLabel>
            <Select
              name="interestLevel"
              value={filters.interestLevel}
              onChange={handleChange}
              label="Interest Level"
            >
              <MenuItem value="">All</MenuItem>
              {LEAD_INTEREST_LEVEL.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              {LEAD_STATUS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "40px" }}
            onClick={onApplyFilters}
          >
            Apply Filters
          </Button>
        </Grid>
        {showReset && (
          <Grid>
            <Button
              variant="outlined"
              fullWidth
              sx={{ height: "40px" }}
              onClick={onResetFilters}
            >
              Reset Filters
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Filters;
