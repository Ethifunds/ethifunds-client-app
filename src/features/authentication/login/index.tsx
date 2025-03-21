import AuthContainer from "@/components/container/auth-container";
import Form from "./form";
import { Link } from "react-router-dom";


export default function Login() {
  //   const { cookie: authToken } = useCookie(variables.STORAGE.session, "");
  //   const { navigate } = useCustomNavigation();
  //   const [isLoading, setIsLoading] = React.useState(true);

  //   const autoLogin = React.useCallback(async () => {
  //     if (!authToken) return setIsLoading(false);

  //     try {
  //       await axios.get(`/me`, {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });

  //       navigate("/home");
  //     } catch (error) {
  //       if (error) throw error;
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, [authToken, navigate]);

  //   React.useLayoutEffect(() => {
  //     autoLogin();
  //   }, [autoLogin]);

  //   if (isLoading) return <LoadingBox type="screen" />;

  return (
    <AuthContainer slideIdx={2}>
      <div className="flex flex-col gap-10 py-10 lg:gap-5 lg:py-10">
        <div className="space-y-3 lg:px-10 lg:text-center">
          <h1 className="hero-accent text-neutral-base_black">
            {" "}
            Login to your account{" "}
          </h1>
          <p className="content-standard text-neutral-700">
            Access your personalized dashboard to manage your Ethifunds wallet
            and track your investments
          </p>
        </div>
        <Form />
        <div className="text-center">
          <span className="highlight-standard text-neutral-500">
            Don't have an account ?
          </span>{" "}
          <Link to={"/sign-up"} className="content-accent text-secondary">
            Sign up
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
}
