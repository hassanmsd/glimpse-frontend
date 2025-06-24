import { Navigate } from "react-router-dom";

import Login from "../../modules/login";

import { useAuth } from "../../context/Auth";

const LoginPage = () => {
  const { userId } = useAuth();
  if (userId) return <Navigate to={"/"} replace />;

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
