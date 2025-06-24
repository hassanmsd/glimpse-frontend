interface LeadsData {
  leadID: string;
  leadName: string;
  contactInformation: string;
  source: string;
  interestLevel: string;
  status: string;
  assignedPerson: string;
  userId: string;
}

interface SnackbarArgs {
  isOpen?: boolean;
  onClose?: () => void;
  severity?: Severity;
  message?: string;
  autoHideDuration?: number;
}

type Severity = "success" | "error" | "info" | "warning";

enum STATUS {
  NEW = "New",
  CLOSED = "Closed",
  QUALIFIED = "Qualified",
  CONTACTED = "Contacted",
}

enum INTEREST_LEVEL {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

enum SOURCE {
  REFERRAL = "Referral",
  WEBSITE = "Website",
  COLD_CALL = "Cold Call",
  EVENT = "Event",
}

interface LeadFilters {
  source: SOURCE | "";
  interestLevel: INTEREST_LEVEL | "";
  status: STATUS | "";
}

export type { LeadsData, SnackbarArgs, Severity, LeadFilters };

export { STATUS, INTEREST_LEVEL, SOURCE };
