import { Link } from "react-router-dom";

const Nav = () => {
  return (
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
