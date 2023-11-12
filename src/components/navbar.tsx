import { Link } from "react-router-dom";
import MoodyLogo from "@/assets/moody.svg";

const Navbar = () => {
  return (
    <header className="flex flex-row items-center justify-center px-20 py-6 lg:justify-between lg:py-8">
      <Link to="/">
        <img src={MoodyLogo} alt="Moody." />
      </Link>
      <div className="hidden space-x-6 lg:block">
        {/* <a
          className="rounded-md px-1.5 py-1.5 font-medium tracking-tight transition-all hover:bg-neutral-800"
          href="#"
        >
          What we love
        </a> */}
        <Link
          className="rounded-md px-1.5 py-1.5 font-medium tracking-tight transition-all hover:bg-neutral-800"
          to="/about"
        >
          About us
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
