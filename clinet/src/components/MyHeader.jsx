import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";

export default function MyHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-1s">
        <Link to="/">
          <div className="flex flex-wrap">
          <img
                className=" h-[70px] w-[70px]object-cover flex-wrap"
                src="../images/logo.png"
                alt="Logo"
              />
          <h1 className='hidden sm:block  font-bold text-sm sm:text-xl flex  flex-wrap self-center ml-2 '>
            <span className='text-slate-500'>Elite Residential</span>
            <span className='text-slate-700'>Solutions</span>
          </h1>
          </div>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className=" font-bold hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="font-bold hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrIN_phrkQozJkBJi9v7jqOEazcPIad5SYA&usqp=CAU"
              />
            ) : (
              <li className="font-bold text-slate-700 hover:underline">
                {" "}
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
