"use client";

import Link from "next/link";
import "./Header.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [details, setDetails] = useState([]);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("foodData");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("foodData");
    router.push("/restaurant");
  };

  return (
    <div className="header">
      <div className="logo">
        <img style={{ width: 100 }} src="/f.jpeg" alt="logo" />
      </div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        {details && details.name ? (
          <>
            <li>
              <Link href={"/restaurant"} onClick={onLogout}>
                Logout
              </Link>
            </li>
            <li>
              <Link href={"/"}>Profile</Link>
            </li>
          </>
        ) : (
          <Link href={"/"}>Login</Link>
        )}
      </ul>
    </div>
  );
};

export default Header;
