import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";

import { auth } from "../../lib/firebase";
import { createUser } from "../../api";
import { useAuth } from "../../context/Auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserId } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");

    // Basic form validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      // Call function to create user with Firebase auth and return the UID
      const uid = await createUser({ auth, email, password });
      setUserId(uid);

      // Redirect user to the home page after successful signup
      navigate("/");
    } catch (err: any) {
      // Handle known Firebase error or fallback to generic error
      const errorMessage =
        err.code === "auth/invalid-email"
          ? "Invalid Email"
          : "Failed to sign up";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 360, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Sign Up
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />

        {error && (
          <Typography color="error" fontSize={14} mt={1}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
