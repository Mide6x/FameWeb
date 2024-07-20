import { NavLink } from "react-router-dom";
import "../Navbar.css";
import { useAuth } from "../../store/auth";

export const Navibar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/dashboard">Home</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/orders"> Orders </NavLink>
              </li>
              <li>
                <NavLink to="/payments"> Payments </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
