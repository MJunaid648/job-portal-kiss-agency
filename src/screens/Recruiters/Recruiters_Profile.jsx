import { useState } from "react";

function RecruitersProfile() {
  const [joinDate] = useState("2022-03-15");
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    role: "Senior Technical Recruiter",
    company: "TechCorp",
    address: "San Fransico Bay Area",
    experience: "10_ years",
    isVerified: true,
    imageUrl:"/images/recruiters-image.png",
    coverUrl:"/images/recruiters-cover.png",
    about:
      "Passionate about connecting top talent with innovative companies. I specialize in building engineering teams for high-growth startups and established tech companies. My approach focuses on understanding both technical requirements and cultural fit to ensure successful, long-term placements.",
  });

  const calculateTimeOnPlatform = (joinDate) => {
    const join = new Date(joinDate);
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - join.getFullYear()) * 12 +
      (now.getMonth() - join.getMonth());
    return `${Math.floor(diffInMonths / 12)} years ${diffInMonths % 12} months`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
          <img
            src={userProfile.coverUrl}
            alt="Profile cover showing a professional office setting"
            className="w-full h-full object-cover rounded-t-lg opacity-20"
          />
          <div className="absolute -bottom-16 left-8">
            <img
              src={userProfile.imageUrl}
              alt="Sarah Johnson's professional headshot"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-inter text-gray-900">
                {userProfile.name}
              </h1>
              <p className="text-lg text-gray-600 font-inter">
                {userProfile.role} at {userProfile.company}
              </p>
            </div>
            {userProfile.isVerified && (
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                <span className="text-blue-700 font-inter text-sm">
                  Verified Company
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center text-gray-500">
            <i className="fas fa-map-marker-alt mr-2"></i>
            <span className="font-inter">{userProfile.address}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold font-inter mb-4">
                Experience
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <i className="fas fa-briefcase mt-1 text-blue-500"></i>
                  <div>
                    <p className="font-inter font-medium">
                      {userProfile.experience} in {userProfile.role}
                    </p>
                    <p className="text-gray-600 font-inter">
                      Specialized in Software Engineering roles
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <i className="fas fa-users mt-1 text-blue-500"></i>
                  <div>
                    <p className="font-inter font-medium">
                      500+ Successful Placements
                    </p>
                    <p className="text-gray-600 font-inter">
                      Focus on senior and leadership positions
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold font-inter mb-4">
                Platform Stats
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <i className="fas fa-clock mt-1 text-blue-500"></i>
                  <div>
                    <p className="font-inter font-medium">Time on Platform</p>
                    <p className="text-gray-600 font-inter">
                      {calculateTimeOnPlatform(joinDate)}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <i className="fas fa-star mt-1 text-blue-500"></i>
                  <div>
                    <p className="font-inter font-medium">Response Rate</p>
                    <p className="text-gray-600 font-inter">
                      95% within 24 hours
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold font-inter mb-4">About</h2>
            <p className="text-gray-700 font-inter leading-relaxed">
              {userProfile.about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruitersProfile;
