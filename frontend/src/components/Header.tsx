import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div>
      <div>
        <span>
          <Link to="/">Ochean de view</Link>
        </span>
        <span>
          {isLoggedIn ? (
            <div className="flex gap-6">
              <span>
                <Link to="/my-bookings">My Bookings</Link>
              </span>
              <span>
                <Link to="/my-hotels">My Hotels</Link>
              </span>
               <SignOutButton/>
            </div>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
