import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email address"),
  password: Yup.string().min(6).required("Please enter your password"),
  phone: Yup.string().min(6).required("Please enter your phone number"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter your email address"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const recruitersRegistrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name should be at least 2 characters")
    .max(50, "Last name should not exceed 50 characters")
    .required("Please enter your first name"),
  last_name: Yup.string()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should not exceed 50 characters")
    .required("Please enter your last name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  company_name: Yup.string()
    .min(2, "Company name should be at least 2 characters")
    .max(50, "Company name should not exceed 50 characters")
    .required("Please enter your company name"),
  country: Yup.string()
    .oneOf(["United States"])
    .required("Please Select your country"),
  role: Yup.string()
    .oneOf(["Recruiter", "HR Professional", "Hiring Manager"])
    .required("Please Select your role"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const jobSeekersRegistrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should not exceed 50 characters")
    .required("Please enter your full name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  phone: Yup.string()
    .min(6, "Phone number should be at least 6 digits")
    .max(15, "Phone number should not exceed 15 digits")
    .required("Please enter your phone number"),
  address: Yup.object({
    street: Yup.string(),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    zip_code: Yup.string()
      .min(4, "Zip code should be at least 4 characters")
      .max(10, "Zip code should not exceed 10 characters")
      .required("Please enter your zip code"),
  }),
  professionalTitle: Yup.string()
    .min(2, "Professional title should be at least 2 characters")
    .max(50, "Professional title should not exceed 50 characters")
    .required("Please select your professional title"),
  industry: Yup.string()
    .oneOf(["Technology", "Healthcare", "Finance", "Education", "Other"])
    .required("Please select your industry"),
  education: Yup.string()
    .oneOf([
      "High School",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
      "Other",
    ])
    .required("Please select your education"),
  yearsOfExperience: Yup.string()
    .oneOf([
      "Less than 1 year",
      "1-3 years",
      "3-5 years",
      "5-10 years",
      "10+ years",
    ])
    .required("Please select your years of experience"),
  skillLevel: Yup.string()
    .oneOf(["Entry Level", "Intermediate", "Advanced", "Expert"])
    .required("Please select your skill level"),
  skills: Yup.array()
    .of(Yup.string())
    .oneOf([
      "Leadership",
      "Communication",
      "Problem Solving",
      "Project Managemment",
      "Teamwork",
      "Analytical",
    ])
    .min(1, "Please select at least one skill")
    .required("Please select your skills"),
  aboutCandidate: Yup.string()
    .min(10, "About section should be at least 10 characters")
    .max(1000, "About section should not exceed 1000 characters")
    .required("Please provide some information about yourself"),
});

export const jobSeekersProfileEditSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should not exceed 50 characters")
    .required("Please enter your full name"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  phone: Yup.string()
    .min(6, "Phone number should be at least 6 digits")
    .max(15, "Phone number should not exceed 15 digits")
    .required("Please enter your phone number"),
  address: Yup.object({
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zipCode: Yup.string()
      .min(4, "Zip code should be at least 4 characters")
      .max(10, "Zip code should not exceed 10 characters"),
  }),
  professionalTitle: Yup.string()
    .min(2, "Professional title should be at least 2 characters")
    .max(50, "Professional title should not exceed 50 characters")
    .required("Please provide your professional title"),
  industry: Yup.string()
    .oneOf(["Technology", "Healthcare", "Finance", "Education", "Other"])
    .required("Industry is required"),
  education: Yup.string()
    .oneOf([
      "High School",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
      "Other",
    ])
    .required("Education level is required"),
  yearsOfExperience: Yup.string()
    .oneOf([
      "Less than 1 year",
      "1-3 years",
      "3-5 years",
      "5-10 years",
      "10+ years",
    ])
    .required("Years of experience is required"),
  skillLevel: Yup.string()
    .oneOf(["Entry Level", "Intermediate", "Advanced", "Expert"])
    .required("Skill level is required"),
  recommendations: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Recommender's name is required"),
      title: Yup.string().required("Recommender's title is required"),
      text: Yup.string().required("Recommendation text is required"),
    })
  ),
  backgroundColor: Yup.string().required("Background color is required"),
  layoutStyle: Yup.string()
    .oneOf(["Classic", "Modern", "Minimal"])
    .required("Profile layout style is required"),
});
