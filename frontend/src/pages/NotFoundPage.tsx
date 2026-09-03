import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-[#ECFDF3] px-3 py-1 rounded-full mb-3">
        404 Error
      </span>
      <h1 className="text-4xl font-extrabold text-[#171717] tracking-tight">
        Page Not Found
      </h1>
      <p className="text-sm text-[#6B6B6B] mt-2 max-w-sm">
        The page or product you are looking for does not exist or has been relocated.
      </p>
      <Link to="/" className="mt-6">
        <Button className="bg-[#111111] hover:bg-black text-white rounded-xl text-xs font-semibold h-11 px-6">
          <ChevronLeft className="h-4 w-4 mr-1.5" />
          Back to Shop
        </Button>
      </Link>
    </div>
  );
}
