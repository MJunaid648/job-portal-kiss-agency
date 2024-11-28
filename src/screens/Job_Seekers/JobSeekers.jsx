"use client";
import React from "react";
import { Link } from "react-router-dom";

function JobSeekers() {
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
              <Link to="/login" target="_self">
                <button className="font-poppins px-8 py-3 rounded-lg bg-[#4a90e2] text-white hover:bg-[#357abd]">
                  Sign In
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
              Sign In
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#2d3748] mb-6">
            Elevate Your Career with Video Profiles
          </h1>
          <p className="font-poppins text-xl text-[#4a5568] mb-8">
            Stand out to employers with AI-powered video introductions and
            verified credentials
          </p>
          <Link to="/job-seekers-registration" target="_self">
            <button className="font-poppins bg-[#4a90e2] text-white px-8 py-3 rounded-lg hover:bg-[#357abd] text-lg">
              Create Your Profile
            </button>
          </Link>
        </div>

        <section className="bg-white py-12 rounded-lg shadow-md mb-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-poppins text-3xl font-bold text-[#2d3748] mb-8">
              Why Job Seekers Choose Us
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="bg-[#4a90e2] text-white p-6 rounded-lg shadow-md w-full md:w-[300px]">
                <i className="fab fa-linkedin text-3xl mb-4"></i>
                <h3 className="font-poppins text-xl font-semibold mb-2">
                  LinkedIn Integration
                </h3>
                <p className="font-poppins">
                  Import your professional history and keep it synced
                  automatically
                </p>
              </div>
              <div className="bg-[#4a90e2] text-white p-6 rounded-lg shadow-md w-full md:w-[300px]">
                <i className="fas fa-video text-3xl mb-4"></i>
                <h3 className="font-poppins text-xl font-semibold mb-2">
                  Video Profiles
                </h3>
                <p className="font-poppins">
                  Create engaging 5-minute video introductions to showcase your
                  personality
                </p>
              </div>
              <div className="bg-[#4a90e2] text-white p-6 rounded-lg shadow-md w-full md:w-[300px]">
                <i className="fas fa-robot text-3xl mb-4"></i>
                <h3 className="font-poppins text-xl font-semibold mb-2">
                  AI Analysis
                </h3>
                <p className="font-poppins">
                  Let our AI identify and tag your key skills from your video
                  content
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="/images/job-seekers.png"
                alt="Professional creating a video profile"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-poppins text-3xl font-bold text-[#2d3748] mb-6">
                Get Noticed by Top Employers
              </h2>
              <div className="space-y-4">
                <p className="font-poppins text-lg text-[#4a5568]">
                  Our platform helps you stand out in the job market by
                  showcasing your authentic self through video profiles and
                  AI-powered skill matching.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check-circle text-[#4a90e2] mr-2"></i>
                    Create compelling video introductions
                  </li>
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check-circle text-[#4a90e2] mr-2"></i>
                    Get verified as a US-based professional
                  </li>
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check-circle text-[#4a90e2] mr-2"></i>
                    Connect directly with hiring managers
                  </li>
                  <li className="flex items-center font-poppins text-[#4a5568]">
                    <i className="fas fa-check-circle text-[#4a90e2] mr-2"></i>
                    Let AI match you with perfect opportunities
                  </li>
                </ul>
                <button className="mt-6 bg-[#4a90e2] text-white px-8 py-3 rounded-lg hover:bg-[#357abd] font-poppins">
                  <Link to="/job-seekers-registration"> Join Now</Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default JobSeekers;
