import  { useState } from "react";

function RecruiterProjectHub() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Frontend Developer Position",
      candidates: [
        {
          id: 1,
          name: "Alice Smith",
          status: "screening",
          skills: ["React", "TypeScript", "UI/UX"],
          notes: "Initial screening showed strong frontend skills",
        },
        {
          id: 2,
          name: "Bob Johnson",
          status: "interview",
          skills: ["JavaScript", "React", "Node.js"],
          notes: "Good communication skills, scheduled for technical interview",
        },
      ],
      projectNotes: "Looking for someone with 3+ years of experience",
      status: "open",
    },
    {
      id: 2,
      name: "Full Stack Engineer",
      candidates: [
        {
          id: 3,
          name: "Carol Williams",
          status: "screening",
          skills: ["Python", "React", "MongoDB"],
          notes: "Strong backend experience, needs frontend assessment",
        },
        {
          id: 4,
          name: "David Brown",
          status: "shortlisted",
          skills: ["Java", "Spring", "React"],
          notes: "Excellent technical skills, cultural fit interview pending",
        },
      ],
      projectNotes: "Must have experience with microservices",
      status: "closed",
    },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectNotes, setProjectNotes] = useState("");
  const [projectFeedback, setProjectFeedback] = useState({
    foundThroughPlatform: false,
    searchDuration: "",
    rating: "",
    feedback: "",
  });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  const handleStatusChange = (projectId, candidateId, newStatus) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            candidates: project.candidates.map((candidate) =>
              candidate.id === candidateId
                ? { ...candidate, status: newStatus }
                : candidate
            ),
          };
        }
        return project;
      })
    );
  };

  const handleNoteChange = (projectId, candidateId, note) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            candidates: project.candidates.map((candidate) =>
              candidate.id === candidateId
                ? { ...candidate, notes: note }
                : candidate
            ),
          };
        }
        return project;
      })
    );
  };

  const handleCloseProject = (projectId) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: "closed" } : project
      )
    );
    setShowFeedbackModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-poppins font-bold mb-6 text-gray-800">
          Recruitment Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <div className="md:col-span-4 bg-white p-4 rounded-lg shadow">
            <h2 className="font-poppins font-semibold mb-4">Projects</h2>
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full text-left p-2 rounded mb-2 ${
                  selectedProject?.id === project.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
          <div className="md:col-span-8 bg-white p-4 rounded-lg shadow">
            {selectedProject ? (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <h2 className="font-poppins font-semibold text-xl">
                      {selectedProject.name}
                    </h2>
                    {selectedProject.status === "open" ? (
                      <button
                        onClick={() => handleCloseProject(selectedProject.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        End
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowFeedbackModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        View Feedback
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <input
                      type="text"
                      placeholder="Search candidates..."
                      className="border p-2 rounded"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border p-2 rounded"
                    >
                      <option value="all">All Status</option>
                      <option value="screening">Screening</option>
                      <option value="interview">Interview</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedProject.candidates
                    .filter(
                      (candidate) =>
                        candidate.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) &&
                        (filterStatus === "all" ||
                          candidate.status === filterStatus)
                    )
                    .map((candidate) => (
                      <div key={candidate.id} className="border p-4 rounded">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h3 className="font-poppins font-semibold">
                              {candidate.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {candidate.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <select
                            value={candidate.status}
                            onChange={(e) =>
                              handleStatusChange(
                                selectedProject.id,
                                candidate.id,
                                e.target.value
                              )
                            }
                            className="mt-2 md:mt-0 border p-2 rounded bg-white"
                          >
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div className="mt-4 space-y-2">
                          <textarea
                            placeholder="Add notes about candidate..."
                            value={candidate.notes}
                            onChange={(e) =>
                              handleNoteChange(
                                selectedProject.id,
                                candidate.id,
                                e.target.value
                              )
                            }
                            className="w-full border p-2 rounded"
                            rows="3"
                          />
                          {candidate.notes && (
                            <div className="bg-gray-50 p-3 rounded">
                              <h4 className="font-semibold mb-2">
                                Previous Notes:
                              </h4>
                              <p className="whitespace-pre-wrap">
                                {candidate.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <i className="fas fa-folder-open text-4xl mb-2"></i>
                <p>Select a project to view candidates</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-poppins font-semibold mb-4">Calendar</h2>
            <div className="grid grid-cols-7 gap-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  i - selectedDate.getDay() + 1
                );
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`p-2 text-center rounded ${
                      date.toDateString() === selectedDate.toDateString()
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-poppins font-semibold mb-4">Project Notes</h2>
            <textarea
              placeholder="Add general project notes here..."
              value={projectNotes}
              onChange={(e) => setProjectNotes(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              rows="6"
            />
            {projectNotes && (
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-semibold mb-2">Previous Project Notes:</h4>
                <p className="whitespace-pre-wrap">{projectNotes}</p>
              </div>
            )}
          </div>
        </div>

        {showFeedbackModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="font-poppins font-semibold mb-4">
                Project Feedback
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={projectFeedback.foundThroughPlatform}
                    onChange={(e) =>
                      setProjectFeedback((prev) => ({
                        ...prev,
                        foundThroughPlatform: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  <label>Candidate found through platform</label>
                </div>
                <input
                  type="text"
                  placeholder="Search duration (e.g., 2 weeks)"
                  value={projectFeedback.searchDuration}
                  onChange={(e) =>
                    setProjectFeedback((prev) => ({
                      ...prev,
                      searchDuration: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded"
                />
                <select
                  value={projectFeedback.rating}
                  onChange={(e) =>
                    setProjectFeedback((prev) => ({
                      ...prev,
                      rating: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Rating</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
                <textarea
                  placeholder="Additional feedback..."
                  value={projectFeedback.feedback}
                  onChange={(e) =>
                    setProjectFeedback((prev) => ({
                      ...prev,
                      feedback: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded"
                  rows="3"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Handle save feedback
                      setShowFeedbackModal(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterProjectHub;