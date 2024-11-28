const CLIENT_ID = "77n8i4orzd1rrg";
const REDIRECT_URI = "http://localhost:5173/linkedin/callback";

const LinkedInLogin = () => {
  const handleLogin = () => {
    const authorizationURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=openid%20profile%20w_member_social%20email`;

    window.location.href = authorizationURL;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-md font-semibold"
    >
      <img src="./linkedIn.png" width={22} alt="LinkedIn logo" />
      Login With LinkedIn
    </button>
  );
};

export default LinkedInLogin;
