import { useState } from "react";
import { recruitersRegistrationSchema } from "../../schemas";
import { useFormik } from "formik";
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  company_name: "",
  country: "United States",
  role: "HR Professional",
  password: "",
  confirm_password: "",
};

function RecruitersRegistration() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      handleSubmit();
    }
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: recruitersRegistrationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {step === 1 ? (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 font-roboto">
              Create your recruiter account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.first_name && touched.first_name ? (
                      <p className="text-red-600 mt-[5px] text-sm">
                        {errors.first_name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.last_name && touched.last_name ? (
                      <p className="text-red-600 mt-[5px] text-sm">
                        {errors.last_name}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {errors.company_name && touched.company_name ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.company_name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="United Stated">United States</option>
                  </select>
                  {errors.country && touched.country ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.country}
                    </p>
                  ) : null}
                </div>

                {/* <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <button
                      type="button"
                      onClick={toggleNewCompany}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      {formData.isNewCompany
                        ? "Join Existing Company"
                        : "Create New Company"}
                    </button>
                  </div>
                  {formData.isNewCompany ? (
                    <input
                      type="text"
                      name="newCompany"
                      value={formData.newCompany}
                      onChange={handleChange}
                      placeholder="Enter new company name"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                      required
                    />
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for company..."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                      />
                      {searchTerm && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                          {filteredCompanies.map((company) => (
                            <button
                              key={company.id}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  companyId: company.id,
                                }));
                                setSearchTerm(company.name);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              {company.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Recruiter">Recruiter</option>
                    <option value="HR Professional">HR Professional</option>
                    <option value="Hiring Manager">Hiring Manager</option>
                  </select>
                  {errors.role && touched.role ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.role}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.confirm_password}
                    </p>
                  ) : null}
                </div>

                <div>
                  <button
                    onClick={handleNext}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 font-roboto mb-8">
            Choose your plan
          </h2>
          <div className="space-y-4">
            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, accountType: "free" }));
                handleSubmit();
              }}
              className="w-full p-6 text-left border rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Free Account</h3>
                <span className="text-gray-500">$0/month</span>
              </div>
              <p className="mt-2 text-gray-500">
                Basic features for individual recruiters
              </p>
            </button>

            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, accountType: "individual" }));
                handleSubmit();
              }}
              className="w-full p-6 text-left border rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Individual Pro</h3>
                <span className="text-gray-500">$29/month</span>
              </div>
              <p className="mt-2 text-gray-500">
                Advanced features for power users
              </p>
            </button>

            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, accountType: "company" }));
                handleSubmit();
              }}
              className="w-full p-6 text-left border rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Company</h3>
                <span className="text-gray-500">$99/month</span>
              </div>
              <p className="mt-2 text-gray-500">
                Full features for entire recruiting teams
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruitersRegistration;
