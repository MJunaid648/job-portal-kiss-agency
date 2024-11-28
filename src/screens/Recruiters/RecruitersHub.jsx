"use client";
import React from "react";
import { Link } from "react-router-dom";

function RecruitersHub() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="font-poppins text-2xl font-bold text-[#2d3748]"
              >
                TalentMatch
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/recruiters-registration-and-page" target="_self">
                <button className="font-poppins px-8 py-3 rounded-lg bg-[#4a90e2] text-white hover:bg-[#357abd]">
                  <i className="fab fa-linkedin mr-2"></i>
                  Sign in with LinkedIn
                </button>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#2d3748]"
              >
                <i
                  className={`fas ${
                    isMenuOpen ? "fa-times" : "fa-bars"
                  } text-xl`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <button className="w-full font-poppins bg-[#4a90e2] text-white px-6 py-2 rounded-lg hover:bg-[#357abd]">
              <i className="fab fa-linkedin mr-2"></i>
              Sign in with LinkedIn
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#2d3748] mb-6">
            Transform Your Recruitment Process
          </h1>
          <p className="font-poppins text-xl text-[#4a5568] mb-8 max-w-3xl mx-auto">
            Access verified US talent through AI-powered video profiles and
            revolutionize how you evaluate candidates
          </p>
          <Link to="" target="_self">
            <button className="font-poppins bg-[#4a90e2] text-white px-8 py-3 rounded-lg hover:bg-[#357abd] text-lg">
              Start Hiring
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-clock text-[#4a90e2] text-4xl mb-4"></i>
            <h3 className="font-poppins text-2xl font-semibold mb-4">
              60% Faster Hiring
            </h3>
            <p className="font-poppins text-[#4a5568]">
              Reduce time-to-hire dramatically with pre-recorded video
              introductions and AI-powered candidate matching
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-check-circle text-[#4a90e2] text-4xl mb-4"></i>
            <h3 className="font-poppins text-2xl font-semibold mb-4">
              Verified Talent
            </h3>
            <p className="font-poppins text-[#4a5568]">
              Access only verified US-based professionals, eliminating
              uncertainty in your hiring process
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-video text-[#4a90e2] text-4xl mb-4"></i>
            <h3 className="font-poppins text-2xl font-semibold mb-4">
              Virtual Interviews
            </h3>
            <p className="font-poppins text-[#4a5568]">
              Conduct seamless virtual interviews and assess soft skills through
              our integrated platform
            </p>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="font-poppins text-3xl font-bold text-[#2d3748] mb-6">
                AI-Powered Talent Search
              </h2>
              <div className="space-y-4">
                <p className="font-poppins text-lg text-[#4a5568]">
                  Our advanced AI technology analyzes video profiles to match
                  candidates based on both technical skills and cultural fit.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                    95% matching accuracy for technical skills
                  </li>
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                    Personality and soft skills assessment
                  </li>
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                    Advanced filtering and search capabilities
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src="/images/ai-img.png"
                alt="AI-powered talent search interface showing candidate matching"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="font-poppins text-3xl font-bold text-[#2d3748] mb-6 text-center">
            Virtual Collaboration Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-poppins text-2xl font-semibold text-[#2d3748]">
                <i className="fas fa-video text-[#4a90e2] mr-3"></i>
                Virtual Interviews
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center font-poppins text-[#4a5568]">
                  <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                  HD video calls with screen sharing
                </li>
                <li className="flex items-center font-poppins text-[#4a5568]">
                  <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                  Built-in technical assessment tools
                </li>
                <li className="flex items-center font-poppins text-[#4a5568]">
                  <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                  Interview recording capabilities
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-poppins text-2xl font-semibold text-[#2d3748]">
                <i className="fas fa-users text-[#4a90e2] mr-3"></i>
                Team Collaboration
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center font-poppins text-[#4a5568]">
                  <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                  Shared candidate notes and ratings
                </li>
                <li className="flex items-center font-poppins text-[#4a5568]">
                  <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                  Team scheduling coordination
                </li>
                <li className="flex items-center font-poppins text-[#4a5568]">
                  <i className="fas fa-check text-[#4a90e2] mr-3"></i>
                  Collaborative hiring decisions
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="font-poppins text-3xl font-bold text-[#2d3748] mb-6 text-center">
            Join Our Recruiter Network
          </h2>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="font-poppins text-lg text-[#4a5568]">
              Help shape the future of talent by joining our network of expert
              recruiters
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-[#f8f9fa]">
                <i className="fas fa-chalkboard-teacher text-[#4a90e2] text-3xl mb-3"></i>
                <h3 className="font-poppins text-xl font-semibold mb-2">
                  Train Job Seekers
                </h3>
                <p className="font-poppins text-sm text-[#4a5568]">
                  Conduct mock interviews and provide feedback
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#f8f9fa]">
                <i className="fas fa-brain text-[#4a90e2] text-3xl mb-3"></i>
                <h3 className="font-poppins text-xl font-semibold mb-2">
                  Share Expertise
                </h3>
                <p className="font-poppins text-sm text-[#4a5568]">
                  Create content and skill-building resources
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#f8f9fa]">
                <i className="fas fa-question-circle text-[#4a90e2] text-3xl mb-3"></i>
                <h3 className="font-poppins text-xl font-semibold mb-2">
                  Submit Questions
                </h3>
                <p className="font-poppins text-sm text-[#4a5568]">
                  Contribute to our interview question database
                </p>
              </div>
            </div>
            <button className="mt-8 font-poppins bg-[#4a90e2] text-white px-8 py-3 rounded-lg hover:bg-[#357abd] text-lg">
              <i className="fas fa-handshake mr-2"></i>
              <Link to="/recruiters-registration">Join as a Recruiter</Link> 
            </button>
          </div>
        </section>

        <section className="text-center bg-[#4a90e2] text-white rounded-lg p-12">
          <h2 className="font-poppins text-3xl font-bold mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="font-poppins text-xl mb-8 max-w-2xl mx-auto">
            Join leading companies who are already finding and hiring top talent
            faster with our AI-powered platform
          </p>
          <button className="font-poppins bg-white text-[#4a90e2] px-8 py-3 rounded-lg hover:bg-gray-100 text-lg">
            <i className="fab fa-linkedin mr-2"></i>
            Sign in with LinkedIn to Start
          </button>
        </section>
      </main>
    </div>
  );
}

export default RecruitersHub;