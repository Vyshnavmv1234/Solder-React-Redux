import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../public/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to logout?</p>

          <div className="logout-toast-buttons">
            <button
              className="confirm-logout-button"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
                closeToast();
                toast.success("Logged out successfully!");
              }}
            >
              Yes, Logout
            </button>

            <button className="cancel-logout-button" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: true,
      },
    );
  };

  return (
    <nav className="navbar">
      {/* App Name */}
      <NavLink to="/products" className="navbar-logo">
        Solder
      </NavLink>

      {/* Navigation Links */}
      <div className="navbar-links">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/myProducts"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          My Products
        </NavLink>

        <NavLink
          to="/addProduct"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Sell Product
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Cart
        </NavLink>

        {isAuthenticated ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
