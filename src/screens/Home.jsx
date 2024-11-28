"use client";
import React from "react";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-poppins text-2xl font-bold text-[#2d3748]">
                TalentMatch
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/job-seekers"
                className="font-poppins px-8 py-3 rounded-lg bg-[#4a90e2] text-white hover:bg-[#357abd]"
              >
                For Job Seekers
              </a>
              <a
                href="/recruiters-hub"
                className="font-poppins px-8 py-3 rounded-lg bg-[#4a90e2] text-white hover:bg-[#357abd]"
              >
                For Recruiters
              </a>
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
            <a
              href="/job-seekers"
              className="block w-full text-left font-poppins px-4 py-2 rounded-lg text-[#2d3748] hover:bg-[#4a90e2] hover:text-white"
            >
              Job Seekers
            </a>
            <a
              href="/recruiters"
              className="block w-full text-left font-poppins px-4 py-2 rounded-lg text-[#2d3748] hover:bg-[#4a90e2] hover:text-white"
            >
              Recruiters
            </a>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-poppins text-[59px] md:text-6xl font-bold text-[#2d3748] mb-6">
            The Future of Professional Networking
          </h1>
          <p className="font-poppins text-[19px] text-[#4a5568] mb-12 max-w-3xl mx-auto">
            Revolutionizing how talent connects with opportunities through
            AI-powered video profiles and verified professional networks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-video text-[#4a90e2] text-4xl mb-4"></i>
            <h3 className="font-poppins text-2xl font-semibold mb-4">
              Video-First Platform
            </h3>
            <p className="font-poppins text-[#4a5568]">
              Break free from traditional resumes with engaging video
              introductions that showcase your true potential
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-shield-alt text-[#4a90e2] text-4xl mb-4"></i>
            <h3 className="font-poppins text-2xl font-semibold mb-4">
              Verified Network
            </h3>
            <p className="font-poppins text-[#4a5568]">
              Connect with confidence through our US address verification system
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <i className="fas fa-brain text-[#4a90e2] text-4xl mb-4"></i>
            <h3 className="font-poppins text-2xl font-semibold mb-4">
              AI-Powered Matching
            </h3>
            <p className="font-poppins text-[#4a5568]">
              Let our advanced AI analyze videos to match skills with
              opportunities
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="w-full md:w-1/2">
            <img
              src="/images/home-img.png"
              alt="AI-powered professional networking platform interface"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="font-poppins text-3xl font-bold text-[#2d3748]">
              More Than Just Another Professional Network
            </h2>
            <p className="font-poppins text-lg text-[#4a5568]">
              We're transforming professional networking by combining the power
              of video, AI, and verified connections to create meaningful
              professional relationships.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href="/job-seekers"
                className="font-poppins px-8 py-4 rounded-lg bg-[#4a90e2] text-white text-center hover:bg-[#357abd]"
              >
                Find Your Next Role
              </a>
              <a
                href="/recruiters"
                className="font-poppins px-8 py-4 rounded-lg bg-[#4a90e2] text-white text-center hover:bg-[#357abd]"
              >
                Find Top Talent
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;