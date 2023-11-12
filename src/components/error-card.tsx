import { AlertCircle } from "lucide-react";

const ErrorCard = () => {
  return (
    <div className="flex flex-row gap-3 rounded-md border border-zinc-800 bg-neutral-900 p-4">
      <AlertCircle className="text-red-600" />
      <h2>Something went wrong. Please try again later.</h2>
    </div>
  );
};

export default ErrorCard;
