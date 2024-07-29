import Link from "next/link";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img style={{ width: 100 }} src="/f.jpeg" alt="logo" />
      </div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Login</Link>
        </li>
        <li>
          <Link href={"/"}>Cart 0</Link>
        </li>
        <li>
          <Link href={"/"}>Add Rastaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
