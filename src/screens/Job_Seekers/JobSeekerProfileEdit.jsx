import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useLoader } from "../../context/Loader_context";
import { jobSeekersProfileEditSchema } from "../../schemas";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  address: { street: "", city: "", state: "", zipCode: "" },
  professionalTitle: "",
  industry: "Technology",
  education: "High School",
  yearsOfExperience: "Less than 1 year",
  skillLevel: "Entry Level",
  recommendations: [],
  backgroundColor: "#ffffff",
  layoutStyle: "Classic",
};

function JobSeekerProfileEdit() {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const liveStreamRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const [profileInfo, setProfileInfo] = useState({
    showBasicInfo: true,
    showVideo: true,
    showSkills: true,
    showEducation: true,
    showExperience: true,
    showRecommendations: true,
    isActive: true,
    isVisible: true,
  });

  const { showLoader, hideLoader } = useLoader();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: jobSeekersProfileEditSchema,
      onSubmit: async (values) => {
        console.log(values);
        console.log(profileInfo);
        showLoader();
        try {
          const formData = new FormData();

          // Add video file if available
          if (videoSource) {
            const videoBlob = await fetch(videoSource).then((res) =>
              res.blob()
            );
            formData.append("video", videoBlob, "recorded_video.webm");
          }

          // Add photo file if available
          if (photoPreview) {
            const photoBlob = await fetch(photoPreview).then((res) =>
              res.blob()
            );
            formData.append("photo", photoBlob, "uploaded_photo.jpg");
          }

          // Add form values (handling nested structures like `address`)
          Object.keys(values).forEach((key) => {
            if (
              typeof values[key] === "object" &&
              !Array.isArray(values[key])
            ) {
              // Stringify nested objects (e.g., `address`)
              formData.append(key, JSON.stringify(values[key]));
            } else if (Array.isArray(values[key])) {
              // Append array values
              values[key].forEach((item, index) => {
                formData.append(`${key}[${index}]`, JSON.stringify(item));
              });
            } else {
              formData.append(key, values[key]);
            }
          });

          // Add profileInfo values
          Object.keys(profileInfo).forEach((key) => {
            formData.append(key, profileInfo[key]);
          });

          // Debugging: Log FormData entries
          console.log("FormData contents:");
          for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        } catch (error) {
          console.error("Submission error:", error);
        }
      },
    });

  console.log(errors);

  const handleCheckboxChange = (event) => {
    const { checked, name } = event.target;
    setProfileInfo((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoSource(URL.createObjectURL(file));
    }
  };

  const startRecording = async () => {
    setVideoSource(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      liveStreamRef.current = stream;

      // Display live preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data); // Push data to ref array
          console.log("Chunk added:", e.data);
        }
      };

      recorder.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });
          setVideoSource(URL.createObjectURL(blob));
          recordedChunksRef.current = []; // Clear chunks in ref after creating video
        } else {
          console.warn("No recorded chunks available.");
        }

        // Stop live preview
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      setMediaRecorder(recorder);
      recorder.start(200); // Collect data every 200ms
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Could not access camera and microphone. Please check permissions."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      if (liveStreamRef.current) {
        liveStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-crimson-text font-bold text-gray-900">
            Edit Profile
          </h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isVisible"
                checked={profileInfo.isVisible}
                onChange={() =>
                  setProfileInfo((prev) => {
                    return { ...prev, isVisible: !prev.isVisible };
                  })
                }
                className="mr-2"
              />
              Profile Visible
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={profileInfo.isActive}
                onChange={() =>
                  setProfileInfo((prev) => {
                    return { ...prev, isActive: !prev.isActive };
                  })
                }
                className="mr-2"
              />
              Active Status
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-[150px] h-[150px] rounded-full border-2 border-gray-300 overflow-hidden">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <i className="fas fa-user text-4xl text-gray-400"></i>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    name="photo"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
                  >
                    <i className="fas fa-camera"></i>
                  </label>
                </div>
              </div>
            </div>
            {/* VIDEO SECTION */}
            <div className="space-y-4">
              {videoSource ? (
                <video
                  src={videoSource}
                  controls
                  className="w-full h-[240px] border rounded-md"
                />
              ) : (
                <>
                  {" "}
                  <video
                    ref={videoRef}
                    className="w-full h-[240px] border rounded-md"
                    autoPlay
                    muted
                  />
                  <p className="text-red-600 mt-[5px] text-sm">
                    Please upload an introductory video
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-md inline-block"
                  >
                    Upload Video
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* TEXT FIELDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors?.fullName && touched.fullName ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.fullName}
                </p>
              ) : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-600 mt-[5px] text-sm">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.phone && touched.phone ? (
                  <p className="text-red-600 mt-[5px] text-sm">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Title
              </label>
              <input
                type="text"
                name="professionalTitle"
                value={values.professionalTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.professionalTitle && touched.professionalTitle ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.professionalTitle}
                </p>
              ) : null}
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Address (Optional)
              </label>
              <input
                type="text"
                name="address.street"
                placeholder="Street Address"
                value={values.address.street}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.address?.street && touched.address?.street ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.address.street}
                </p>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  value={values.address.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.address?.city && touched.address?.city ? (
                  <p className="text-red-600 mt-[5px] text-sm">
                    {errors.address?.city}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  value={values.address.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.address?.state && touched.address?.state ? (
                  <p className="text-red-600 mt-[5px] text-sm">
                    {errors.address?.state}
                  </p>
                ) : null}
                <input
                  type="text"
                  name="address.zipCode"
                  placeholder="ZIP Code"
                  value={values.address?.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.address?.zipCode && touched.address?.zipCode ? (
                  <p className="text-red-600 mt-[5px] text-sm">
                    {errors.address?.zipCode}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <select
                name="industry"
                value={values.industry}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Technology">Technology</option>
                <option value="Healtcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
              {errors.industry && touched.industry ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.industry}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Education Level
              </label>
              <select
                name="education"
                value={values.education}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="High School">High School</option>
                <option value="Associate's Degree">Associate's Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
              {errors.education && touched.education ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.education}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <select
                name="yearsOfExperience"
                value={values.yearsOfExperience}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
              {errors.yearsOfExperience && touched.yearsOfExperience ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.yearsOfExperience}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skill Level
              </label>
              <select
                name="skillLevel"
                value={values.skillLevel}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              {errors.skillLevel && touched.skillLevel ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.skillLevel}
                </p>
              ) : null}
            </div>

            <div className="col-span-2">
              <h2 className="text-lg font-medium mb-4">Section Visibility</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showBasicInfo"
                    checked={profileInfo.showBasicInfo}
                    onBlur={handleBlur}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Basic Information
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showVideo"
                    checked={profileInfo.showVideo}
                    onBlur={handleBlur}
                    onChange={() =>
                      setProfileInfo((prev) => {
                        return { ...prev, showVideo: !prev.showVideo };
                      })
                    }
                    className="mr-2"
                  />
                  Video Introduction
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showSkills"
                    checked={profileInfo.showSkills}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Skills
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showEducation"
                    checked={profileInfo.showEducation}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Education
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showExperience"
                    checked={profileInfo.showExperience}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Experience
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="showRecommendations"
                    checked={profileInfo.showRecommendations}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Recommendations
                </label>
              </div>
            </div>

            <div className="col-span-2">
              <h2 className="text-lg font-medium mb-4">
                Profile Customization
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    name="backgroundColor"
                    onBlur={handleBlur}
                    value={profileInfo.backgroundColor}
                    onChange={handleChange}
                    className="h-10 w-full rounded border"
                  />
                  {errors.backgroundColor && touched.backgroundColor ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.backgroundColor}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Layout Style
                  </label>
                  <select
                    name="layoutStyle"
                    value={values.layoutStyle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Classic">Classic</option>
                    <option value="Modern">Modern</option>
                    <option value="Minimal">Minimal</option>
                  </select>
                  {errors.layoutStyle && touched.layoutStyle ? (
                    <p className="text-red-600 mt-[5px] text-sm">
                      {errors.layoutStyle}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommendations
              </label>
              <div className="space-y-4">
                {values.recommendations.map((rec, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`recommendations[${index}].name`}
                      value={rec.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.recommendations?.[index]?.name &&
                      touched.recommendations?.[index]?.name && (
                        <p className="text-red-600">
                          {errors.recommendations[index].name}
                        </p>
                      )}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedRecs = values.recommendations.filter(
                          (_, i) => i !== index
                        );
                        setFieldValue("recommendations", updatedRecs);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("recommendations", [
                      ...values.recommendations,
                      { name: "", title: "", text: "" },
                    ])
                  }
                >
                  Add Recommendation
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerProfileEdit;
