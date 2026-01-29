import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Menu, X } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/themeSlice";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { MdInsertComment } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="py-2 sm:py-3 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-b-2 z-50 bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-7">
          <Link to={"/"} className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 dark:invert"
              />
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Logo
              </h1>
            </div>
          </Link>
          <form
            onSubmit={handleSearch}
            className="hidden md:block flex-1 max-w-md"
          >
            <div className="relative">
              <Input
                type="text"
                className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-full pr-12 text-sm sm:text-base"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-full px-3 sm:px-4"
                size="icon"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => dispatch(toggleTheme())}
            size="icon"
            className="w-9 h-9 sm:w-10 sm:h-10"
            variant="ghost"
          >
            {theme === "light" ? (
              <FaMoon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FaSun className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>

          <div className="md:hidden">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="w-9 h-9"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-7">
          <ul className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7 text-lg lg:text-xl font-semibold">
            <li>
              <Link
                to={"/"}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-1 py-2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/blogs"}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-1 py-2"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-1 py-2"
              >
                About
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all">
                      {/* <AvatarImage src={user?.photoUrl || user} className="object-cover" /> */}
                      <AvatarImage
                        src={
                          typeof user?.photoUrl === "string"
                            ? user.photoUrl
                            : ""
                        }
                        className="object-cover"
                      />

                      <AvatarFallback className="text-sm">CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 sm:w-56" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-sm sm:text-base">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashbord/profile")}
                        className="text-sm sm:text-base py-2 sm:py-3"
                      >
                        <FaRegUserCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashbord/your-blogs")}
                        className="text-sm sm:text-base py-2 sm:py-3"
                      >
                        <FaBook className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Your Blogs
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashbord/comments")}
                        className="text-sm sm:text-base py-2 sm:py-3"
                      >
                        <MdInsertComment className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Your Comments
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashbord/write-blogs")}
                        className="text-sm sm:text-base py-2 sm:py-3"
                      >
                        <GiNotebook className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Write Blogs
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={logoutHandler}
                        className="text-sm sm:text-base py-2 sm:py-3 text-red-600 dark:text-red-400"
                      >
                        <MdLogout className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  onClick={logoutHandler}
                  className="hidden sm:inline-flex text-sm px-3 sm:px-4 py-2"
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2">
                <Link to={"/login"}>
                  <Button
                    className="text-sm px-3 sm:px-4 py-2"
                    variant="outline"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"/signUp"}>
                  <Button className="hidden sm:inline-flex text-sm px-3 sm:px-4 py-2">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Input
                  type="text"
                  className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-full pr-12 text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3"
                  size="icon"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="space-y-1">
              <Link
                to={"/"}
                className="block px-3 py-2 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to={"/blogs"}
                className="block px-3 py-2 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                to={"/about"}
                className="block px-3 py-2 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>

            <div className="pt-3 border-t border-gray-300 dark:border-gray-600">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.photoUrl || user} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Button
                      onClick={() => {
                        navigate("/dashbord/profile");
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <FaRegUserCircle className="mr-2 w-5 h-5" />
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/dashbord/your-blogs");
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <FaBook className="mr-2 w-5 h-5" />
                      Your Blogs
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/dashbord/comments");
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <MdInsertComment className="mr-2 w-5 h-5" />
                      Your Comments
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/dashbord/write-blogs");
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <GiNotebook className="mr-2 w-5 h-5" />
                      Write Blogs
                    </Button>
                    <Button
                      onClick={() => {
                        logoutHandler();
                        setMobileMenuOpen(false);
                      }}
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <MdLogout className="mr-2 w-5 h-5" />
                      Log out
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Link to={"/login"} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Login</Button>
                  </Link>
                  <Link to={"/signUp"} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
