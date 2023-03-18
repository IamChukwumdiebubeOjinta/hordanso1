import { Outlet, useLocation, Link } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className=" text-black min-h-[70vh]">
      <div className="flex-[0.1] flex justify-between items-baseline">
        <h2 className="text-[3rem]">
          {location.pathname == "/login" ? "Login" : "Register"}
        </h2>
        <Link to='/' className={`nav-link text-[#ad1f29ee]`}>Home</Link>
      </div>
      <div className="flex-[0.9] mx-auto max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
