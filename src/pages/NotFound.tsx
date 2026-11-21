import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";

const NotFound = () => {
  usePageTitle("Page not found");
  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-3">
          404
        </p>
        <h1 className="font-serif text-4xl mb-4">Lost?</h1>
        <p className="text-gray-600 mb-8">
          That page isn’t here. Pick a clear next step.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center text-xs font-bold uppercase tracking-wider">
          <Link to="/homes" className="bg-[#1a1a1a] text-white px-6 py-3">
            Homes
          </Link>
          <Link to="/new-homes" className="border border-[#1a1a1a] px-6 py-3">
            New homes
          </Link>
          <Link to="/contact" className="border border-[#1a1a1a] px-6 py-3">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
