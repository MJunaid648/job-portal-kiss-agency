import { useEffect, useState } from "react";
import { getProfile } from "../API/api";
import { useLoader } from "../context/Loader_context";
import { useAuth } from "../context/Auth_context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { showLoader, hideLoader } = useLoader();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchProfile = async () => {
    try {
      showLoader();
      const response = await getProfile();
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      hideLoader();
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className=" p-4 flex flex-col gap-2 items-center justify-center">
      <h1 className="text-white text-4xl font-semibold text-center">Profile</h1>{" "}
      <br /> <br />
      <p className="text-white text-center">Name: {profileData.name}</p>
      <p className="text-white text-center">Email: {profileData.email}</p>
      <button
        className="bg-yellow-500 px-4 py-2 rounded-md font-semibold"
        onClick={() => {
          logout() ? navigate("/login") : "";
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
