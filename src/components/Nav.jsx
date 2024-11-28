import React from "react";

const Nav = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="font-poppins text-2xl font-bold text-[#2d3748]"
            >
              TalentMatch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
