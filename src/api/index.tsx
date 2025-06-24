import axios from "axios";

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { INTEREST_LEVEL, LeadsData, SOURCE, STATUS } from "../types/global";

const API_URL = "http://localhost:5000";

const saveLeadsInBulk = async ({ data }: SaveLeadsInBulkParams) => {
  try {
    const response = await axios.post(`${API_URL}/lead/bulk`, data);
    return response.data;
  } catch (error: any) {
    // Handle errors while saving lead data
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error saving lead data");
    } else {
      throw new Error("Network or unexpected error occurred");
    }
  }
};

const fetchLeads = async ({
  limit,
  offset,
  source,
  interestLevel,
  status,
  userId,
}: FetchLeadParams): Promise<{ data: LeadsData[]; total: number }> => {
  try {
    const response = await axios.get(`${API_URL}/lead`, {
      params: { limit, offset, source, interestLevel, status, userId },
    });

    return response.data;
  } catch (error: any) {
    // Handle errors while saving lead data
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error saving lead data");
    } else {
      throw new Error("Network or unexpected error occurred");
    }
  }
};

const createUser = async ({ auth, email, password }: CreateUserParams) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return response.user.uid;
  } catch (error) {
    throw error;
  }
};

const logIn = async ({ auth, email, password }: CreateUserParams) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user.uid;
  } catch (error) {
    throw error;
  }
};

export { saveLeadsInBulk, fetchLeads, createUser, logIn };

interface SaveLeadsInBulkParams {
  data: LeadsData[];
}

interface FetchLeadParams {
  limit: number;
  offset: number;
  source?: SOURCE | "";
  interestLevel?: INTEREST_LEVEL | "";
  status?: STATUS | "";
  userId: string;
}

interface CreateUserParams {
  auth: Auth;
  email: string;
  password: string;
}
