import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/api";
import { loginSchema } from "../schemas";
import { useLoader } from "../context/Loader_context";
import { useAuth } from "../context/Auth_context";
import Nav from "../components/Nav";

const initialValues = {
  email: "",
  password: "",
};

function Login2() {
  const { showLoader, hideLoader } = useLoader();
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        showLoader();
        try {
          const res = await loginUser(values);
          if (res && res.data && res.data.accessToken) {
            login(res.data.accessToken);
            navigate("/profile");
          } else {
            console.error("Access token not available in response.");
          }
        } catch (error) {
          console.log(error);
        } finally {
          hideLoader();
        }
      },
    });

  return (
    <>
      <Nav />
      <main className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="font-poppins text-3xl font-bold text-[#2d3748] mb-2">
              Welcome Back
            </h1>
            <p className="font-poppins text-[#4a5568]">
              Sign in to your account
            </p>
          </div>
          <form
            className="flex flex-col gap-4 py-2 pt-0 px-4 border-2 border-white rounded-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="block font-poppins text-sm font-medium text-[#2d3748]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                placeholder="you@example.com"
              />
              {errors.email && touched.email ? (
                <p className="text-red-600 mt-[-5px] text-sm">{errors.email}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="block font-poppins text-sm font-medium text-[#2d3748] mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.password && touched.password ? (
                <p className="text-red-600 mt-[-5px] text-sm">
                  {" "}
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#4a90e2] focus:ring-[#4a90e2] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-[#4a5568] font-poppins"
                >
                  Remember me
                </label>
              </div>
              <a
                href=""
                className="font-poppins text-sm text-[#4a90e2] hover:text-[#357abd]"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#4a90e2] text-white font-poppins px-4 py-3 rounded-lg hover:bg-[#357abd]"
            >
              Sign in
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#4a5568] font-poppins">
                  Or continue with
                </span>
              </div>
            </div>
            <button className="w-full mb-4 flex items-center justify-center gap-2 bg-[#0077b5] text-white font-poppins px-4 py-3 rounded-lg hover:bg-[#006097]">
              <i className="fab fa-linkedin text-xl"></i>
              Sign in with LinkedIn
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#4a5568] font-poppins">
            Don't have an account?{" "}
            <a href="/register" className="text-[#4a90e2] hover:text-[#357abd]">
              Sign up
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login2;