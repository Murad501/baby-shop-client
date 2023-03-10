import { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { darkProvider } from "../../Context/DarkContext";
import { loadingProvider } from "../../Context/LoadingContext";
import { userProvider } from "../../Context/UserContext";
import { saveUser } from "../../Shared/saveUser";

const SignIn = () => {
  const { googleLogin, facebookLogin, signIn } = useContext(userProvider);
  const { setIsLoading } = useContext(loadingProvider);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { isDark } = useContext(darkProvider);

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const user = {
          name,
          email,
          role: "buyer",
        };
        navigate(from, { replace: true });
        saveUser(user);
        toast.success("user sign in successfully");
      })
      .catch((err) => console.error(err));
  };

  const handleFacebookLogin = () => {
    facebookLogin()
      .then((result) => {
        toast.success("user sign in successfully");
        navigate(from, { replace: true });
      })
      .catch((err) => console.error(err));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then((result) => {
        setIsLoading(false);
        toast.success("user sign in successfully");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen py-10 px-2">
      <div>
        <h2 className="text-3xl font-semibold mb-5">Get Started Now</h2>
        <p className="text-lg">Enter your credentials to access your account</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-10">
        <button
          onClick={handleGoogleLogin}
          className={`border ${
            isDark ? "border-gray-800" : "border-rose-400 hover:bg-rose-400"
          } py-2 flex justify-center items-center gap-2 font-semibold  hover:text-white`}
        >
          <FaGoogle></FaGoogle> Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className={`border ${
            isDark ? "border-gray-800" : "border-rose-400 hover:bg-rose-400"
          } py-2 flex justify-center items-center gap-2 font-semibold  hover:text-white`}
        >
          <FaFacebookF></FaFacebookF> Facebook
        </button>
      </div>
      <div className="divider w-1/3 mx-auto">or</div>
      <form onSubmit={handleSignIn} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`border bg-transparent ${
              isDark ? "border-gray-800 " : "border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`border bg-transparent ${
              isDark ? "border-gray-800" : "border-rose-400"
            } p-2 w-full rounded-sm focus:outline-none`}
            required
          />
        </div>
        <div className="mb-6 flex justify-start items-center">
          <button
            type="submit"
            className={`${
              isDark
                ? "border-gray-800 border hover:text-white"
                : "bg-rose-400 text-white"
            } font-semibold px-4 py-2 rounded-none mt-5`}
          >
            Sign In
          </button>
        </div>
      </form>
      <p>
        New here?{" "}
        <Link
          className={`${
            isDark ? "text-gray-200" : "text-rose-400"
          } font-semibold`}
          to="/signup"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
