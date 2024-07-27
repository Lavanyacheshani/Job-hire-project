import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navigation() {
  return (
    <nav className="flex py-12 justify-between items-center">
      <div>
        <Link to={"/"} className="text-4xl font-medium text-underlay-1">
          HirelyAI
        </Link>
      </div>
      <div className="flex justify-center gap-x-8 items-center">
        <Link to={"/"}>Home</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-x-4 items-center">
            <Link to={"/sign-in"}>Sign In</Link>
            <Button asChild>
              <Link to={"/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navigation;
