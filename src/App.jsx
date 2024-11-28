import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import LinkedInCallback from "./screens/LinkedInCallback";
import { LoaderProvider } from "./context/Loader_context";
import Loader from "./components/Loader";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Protected_route";
import { AuthProvider } from "./context/Auth_context";
import Profile from "./screens/Profile";
import RecruitersHub from "./screens/Recruiters/RecruitersHub";
import JobSeekers from "./screens/Job_Seekers/JobSeekers";
import RecruitersRegistration from "./screens/Recruiters/Recruiters_registration";
import RecruitersProfile from "./screens/Recruiters/Recruiters_Profile";
import JobSeekersRegistration from "./screens/Job_Seekers/Job-seekers-registration";
import RecruiterProjectHub from "./screens/Recruiters/RecruiterProjectHub";
import AiVideoResumes from "./screens/AiVideoResumes";
import JobSeekerProfileEdit from "./screens/Job_Seekers/JobSeekerProfileEdit";
import RecordVideoIntro from "./screens/RecordVideoIntro";

function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <AuthProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/job-seekers" element={<JobSeekers />} />
              <Route
                path="/job-seekers-registration"
                element={<JobSeekersRegistration />}
              />
              <Route path="/recruiters-hub" element={<RecruitersHub />} />
              <Route
                path="/recruiters-registration"
                element={<RecruitersRegistration />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/linkedin/callback" element={<LinkedInCallback />} />
              <Route
                path="/recruiter-profile"
                element={<RecruitersProfile />}
              />
              <Route
                path="/recruiter-project-hub"
                element={<RecruiterProjectHub />}
              />
              <Route
                path="/job-seeker-profile-edit"
                element={<JobSeekerProfileEdit />}
              />
              <Route
                path="/record-video-intro"
                element={<RecordVideoIntro />}
              />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
          <Loader />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </LoaderProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
