import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../features/auth/authSlice";
import "../public/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { loading, error } = useSelector((state) => state.auth);

  if (isAuthenticated) navigate("/products");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();

      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Section */}
        <div className="auth-info">
          <div className="brand">
            <h1>Solder</h1>
          </div>

          <div className="auth-info-content">
            <h2>Buy. Sell. Revalue.</h2>

            <p>
              Give your products a second life and discover great items from
              other sellers.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>Welcome back</h2>

            <p>Sign in to continue to your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />

              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>

                <button type="button" className="forgot-password">
                  Forgot password?
                </button>
              </div>

              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <span className="field-error">{errors.password.message}</span>
              )}
            </div>

            {/* Backend Error */}
            {error && <div className="form-error">{error}</div>}

            {/* Submit */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Signup */}
          <div className="signup-link">
            <span>Don't have an account?</span>

            <Link to="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
