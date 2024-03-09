import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <span>
          <Link to="/">Ochean de view</Link>
        </span>
        <span>
          <Link to="/login">Sign In</Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
