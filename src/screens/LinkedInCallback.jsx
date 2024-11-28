import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LinkedInCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      console.error("Error during LinkedIn login:", error);
      navigate("/login");
    }w

    if (code) {
      axios
        .post("http://localhost:5000/linkedin/token", { code })
        .then((response) => {
          console.log("Access Token:", response.data.access_token);
          // Save access token, update app state, or navigate as needed
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  return <div>Processing LinkedIn login...</div>;
};

export default LinkedInCallback;
