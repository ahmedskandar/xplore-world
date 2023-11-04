import LoginForm from "./LoginForm";
import LoginIllustration from "./LoginIllustration";

const Login = () => {
  return (
    <div className="flex flex-col h-[100svh] md:flex-row">
      <LoginForm />
      <LoginIllustration />
    </div>
  );
};

export default Login;
