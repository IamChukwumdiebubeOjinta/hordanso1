import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOut } from "../../vendors/firebase-config";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { NavbarLinkProps, NavProfileProps } from "../../models";
import {
  useLocation,
  useLinkClickHandler,
  useNavigate,
} from "react-router-dom";

const NavLink = ({ to, text }: NavbarLinkProps) => {
  const location = useLocation();
  const clickHandler = useLinkClickHandler(to);

  return (
    <span onClick={clickHandler}>
      <Navbar.Link
        href={to}
        active={location.pathname === to}
        className={`rounded-md nav-link md:hover:text-[#ad1f29] ${
          location.pathname === to
            ? "sm:bg-transparent bg-[#ad1f29] md:text-[#ad1f29]"
            : ""
        }`}
      >
        {text}
      </Navbar.Link>
    </span>
  );
};

const NavInfo = ({
  avatar: { alt, image },
  info: { name },
}: NavProfileProps) => {
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };
  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<Avatar alt={alt} img={image} rounded={true} />}
    >
      <Dropdown.Item>
        <span className="block text-sm">{name}</span>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>
        <button className="block truncate text-sm font-medium" onClick={logOut}>
          Logout
        </button>
      </Dropdown.Item>
    </Dropdown>
  );
};

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        {/* Left */}
        <Navbar.Brand />

        {/* Right */}
        <>
          <div className="flex md:order-2 gap-2">
            {user && (
              <>
                <NavInfo
                  avatar={{
                    alt: "Profile Picture",
                    image:
                      "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                  }}
                  info={{ name: "Graham Potter" }}
                />
                <Navbar.Toggle />
              </>
            )}
          </div>

          {/* Nav links */}
          <Navbar.Collapse>
            <NavLink to="/" text="Home" />
            {!user ? (
              <>
                <NavLink to="/login" text="Login" />
                <NavLink to="/register" text="Register" />
              </>
            ) : (
              <>
                <NavLink to="/translate" text="Translate" />
                <NavLink to="/generate" text="Generate" />
              </>
            )}
          </Navbar.Collapse>
        </>
      </Navbar>
    </>
  );
};

export default Header;
