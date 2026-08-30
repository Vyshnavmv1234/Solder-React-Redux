import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../features/auth/authSlice";

import "../public/Signup.css";

const Signup = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/login')

    } catch (error) {
      console.error("Registration failed:", error);
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
            <h2>Join Solder.</h2>

            <p>
              Buy products you love, sell things you
              no longer need, and give everything a
              second life.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="auth-form-container">

          <div className="auth-form-header">
            <h2>Create an account</h2>

            <p>
              Sign up to start buying and selling
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message:
                      "Name must be at least 2 characters",
                  },
                })}
              />

              {errors.name && (
                <span className="field-error">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:
                      "Please enter a valid email",
                  },
                })}
              />

              {errors.email && (
                <span className="field-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="field-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required:
                    "Please confirm your password",
                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                })}
              />

              {errors.confirmPassword && (
                <span className="field-error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Backend Error */}
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>

          </form>

          {/* Login */}
          <div className="signup-link">
            <span>Already have an account?</span>

            <Link to="/login">
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;