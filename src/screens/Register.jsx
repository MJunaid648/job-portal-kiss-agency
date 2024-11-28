import { Link } from "react-router-dom";
import { useLoader } from "../context/Loader_context";
import { registerUser } from "../API/api";
import { useFormik } from "formik";
import { registerSchema } from "../schemas";
import { toast } from "react-toastify";
import Nav from "../components/Nav";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const { showLoader, hideLoader } = useLoader();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        showLoader();
        try {
          const res = await registerUser(values);
          toast.success(res.message);
        } catch (error) {
          toast.error(error.message);
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
              Welcome
            </h1>
            <p className="font-poppins text-[#4a5568]">
              Create your own account
            </p>
          </div>

          <form
            className="flex flex-col gap-4  py-2 pt-0 px-4  border-2 border-white rounded-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="block font-poppins text-sm font-medium text-[#2d3748]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                placeholder="you@example.com"
              />
              {errors.name && touched.name ? (
                <p className="text-red-600 my-[-10px] text-sm">{errors.name}</p>
              ) : null}
            </div>

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
                <p className="text-red-600 my-[-10px] text-sm">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="block font-poppins text-sm font-medium text-[#2d3748]"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                placeholder="+1(123) 456 7890"
              />
              {errors.phone && touched.phone ? (
                <p className="text-red-600 my-[-10px] text-sm">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="block font-poppins text-sm font-medium text-[#2d3748]"
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
                placeholder="********"
              />
              {errors.password && touched.password ? (
                <p className="text-red-600 my-[-10px] text-sm">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirm_password"
                className="block font-poppins text-sm font-medium text-[#2d3748]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent"
                placeholder="********"
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="text-red-600 my-[-10px] text-sm">
                  {errors.confirm_password}
                </p>
              ) : null}
            </div>

            <button
              className="w-full bg-[#4a90e2] text-white font-poppins px-4 py-3 rounded-lg hover:bg-[#357abd]"
              type="submit"
            >
              Register
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
              Sign up with LinkedIn
            </button>

            <p className="block font-poppins text-sm font-medium text-[#2d3748]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4a90e2] hover:text-[#357abd]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
