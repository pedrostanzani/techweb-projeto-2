import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = ({ name }: { name: string }) => {
  return (
    <div className="mb-6 flex flex-row items-center gap-1 text-zinc-400">
      <Link
        to="/moods"
        className=" cursor-pointer select-none rounded-md py-0.5 tracking-tight transition-all hover:underline"
      >
        Moods
      </Link>
      <ChevronRight size={18} />
      <p className=" cursor-pointer select-none rounded-md py-0.5 font-medium tracking-tight text-zinc-50 transition-all">
        {name}
      </p>
    </div>
  );
};

export default Breadcrumbs;
