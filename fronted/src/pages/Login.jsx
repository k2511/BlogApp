import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true))
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
     dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block">
        <img src={auth} alt="" className="h-[700px]" />
      </div>
      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <div>
          <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-400 dark:border-gray-600">
            <CardHeader>
              <CardTitle>
                <h1 className="text-center text-xl font-semibold">
                  Login Into Your Account
                </h1>
              </CardTitle>
              <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
                Enter your details below to create your account
              </p>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={input.email}
                  onChange={handleChange}
                ></Input>
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your Password"
                  value={input.password}
                  onChange={handleChange}
                ></Input>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className=" absolute right-3 top-8 text-gray-500"
                >
                  {" "}
                  {showPassword ? <EyeOff size={20} /> : <Eye />}
                </button>
              </div>
             
              <Button type="submit" className="w-full">
              {
                loading ? (
                  <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please await
                  </>
                ) : ("Login")
              }
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an Account?{" "}
                <Link to={"/login"}>
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Sign Up
                  </span>
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
