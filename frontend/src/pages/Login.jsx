  import { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import { useAuth } from "../context/authContext";

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      try {
        const res = await axios.post("https://ems-backend-woad.vercel.app/api/auth/login", {
          email,
          password
        });

        if (res.data.success) {
          login(res.data.user);
          localStorage.setItem("token", res.data.token);

          if (res.data.user.role === "admin") {
            navigate('/admin-dashboard');
            window.location.reload();
          } else {
            navigate('/employee-dashboard');
            window.location.reload();



          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setError("Wrong credentials");
          } else {
            setError(error.response.data.message || "Server Error");
          }
        } else {
          setError("Network Error");
        }
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Employee Management System
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 text-center">Login</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center text-sm text-gray-600 mr-4">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2 accent-blue-500"
                  />
                  Show Password
                </label>

                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2 accent-blue-500"
                  />
                  Remember Me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default Login;