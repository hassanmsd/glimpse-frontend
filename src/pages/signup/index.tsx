import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/Auth";

import SignUp from "../../modules/signup";

const SignupPage = () => {
  const { userId } = useAuth();
  if (userId) return <Navigate to={"/"} replace />;

  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignupPage;
