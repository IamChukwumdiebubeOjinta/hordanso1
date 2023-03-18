import { NoLabel } from "../../components";
import { NoLabelInput } from "../../models";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const MagnifyingGlass = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-black min-h-[70vh]">
      <div className="mx-[2rem]">
        <h2 className="text-[4.3rem] cursor-default">Homepage</h2>
      </div>
      <div className="mt-2">
        <NoLabel
          placeholder="Search..."
          name="text"
          value=""
          type="text"
          key={""}
          id="text"
        />
        <div className="mt-2 text-center">Feed</div>
      </div>
    </div>
  );
};

export default Home;
