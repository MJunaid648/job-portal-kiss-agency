import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useLoader } from "../../context/Loader_context";
import { jobSeekersRegistrationSchema } from "../../schemas";

export default function JobSeekersRegistration() {
  const [attestation, setAttestation] = useState(false);
  const [registrationType, setRegistrationType] = useState("jobseeker");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoSource, setVideoSource] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null);
  const liveStreamRef = useRef(null);
  const recordedChunksRef = useRef([]);

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

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoSource(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

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
    skills: [],
    aboutCandidate: "",
  };

  const { showLoader, hideLoader } = useLoader();

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
    validationSchema: jobSeekersRegistrationSchema,
    onSubmit: async (values) => {
      showLoader();
      try {
        const formData = new FormData();
        // Assuming videoSource is a Blob URL, you need to convert it back to Blob
        if (videoSource) {
          // Retrieve the blob from the videoSource (if applicable)
          const videoBlob = await fetch(videoSource).then((res) => res.blob());
          formData.append("video", videoBlob, "recorded_video.webm");
        }
        // If photoPreview is a Blob URL, convert it back to Blob similarly
        if (photoPreview) {
          const photoBlob = await fetch(photoPreview).then((res) => res.blob());
          formData.append("photo", photoBlob, "uploaded_photo.jpg");
        }
        // Log the form data (use FormData.entries() to view the contents)
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        console.log(formData, values);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    },
  });

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setFieldValue("skills", [...values.skills, value]);
    } else {
      setFieldValue(
        "skills",
        values.skills.filter((skill) => skill !== value)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="text-center">
            <a href="/recruiters-registration-and-page" target="_self">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() =>
                    setRegistrationType(
                      registrationType === "jobseeker"
                        ? "employer"
                        : "jobseeker"
                    )
                  }
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Are you a recruiter? Click here
                </button>
              </div>
            </a>
            <h1 className="text-3xl font-bold font-poppins text-gray-900">
              Create Your{" "}
              {registrationType === "jobseeker" ? "Job Seeker" : "Employer"}{" "}
              Profile
            </h1>
            <div className="mt-4">
              <button
                onClick={() => (window.location.href = "/api/auth/linkedin")}
                className="bg-[#0077B5] text-white px-6 py-2 rounded-md flex items-center justify-center w-full sm:w-auto mx-auto"
              >
                <i className="fab fa-linkedin mr-2"></i>
                Connect with LinkedIn
              </button>
              <div className="mt-4 text-gray-500">or</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              {errors.fullName && touched.fullName ? (
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
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
                  {" "}
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Title
              </label>
              <input
                type="text"
                name="professional_itle"
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
                <option value="technology">Technology</option>
                <option value="healtcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "leadership",
                    "communication",
                    "problemSolving",
                    "projectManagement",
                    "teamwork",
                    "analytical",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={values.skills.includes(skill)}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <span>
                        {skill.charAt(0).toUpperCase() +
                          skill.slice(1).replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>
                  ))}
                </div>
                {errors.skills && touched.skills ? (
                  <p className="text-red-600 mt-[5px] text-sm">
                    {errors.skills}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tell us about yourself
              </label>
              <textarea
                name="aboutCandidate"
                value={values.aboutCandidate}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
              {errors.aboutCandidate && touched.aboutCandidate ? (
                <p className="text-red-600 mt-[5px] text-sm">
                  {errors.aboutCandidate}
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Introduction Video
              </label>
              <div className="mt-2 space-y-4">
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
                <p className="text-sm text-gray-500 mt-2">
                  <i className="fas fa-info-circle mr-1"></i>
                  All videos will be edited with AI to ensure consistent quality
                  and will require review before publishing.
                </p>
                <p className="text-sm text-gray-500">
                  <i className="fas fa-robot mr-1"></i>
                  Videos will be analyzed by AI for content moderation and
                  quality assessment.
                </p>
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
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="attestation"
                    name="attestation"
                    type="checkbox"
                    checked={attestation}
                    onChange={(e) => setAttestation(e.target.checked)}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="attestation"
                    className="font-medium text-gray-700"
                  >
                    I agree to the terms and conditions
                  </label>
                  <p className="text-gray-500">
                    By checking this box, I confirm that I have read and
                    understood all disclaimers, and I agree that my profile
                    information and video content may be processed and analyzed
                    by AI systems.
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                disabled={!attestation}
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
