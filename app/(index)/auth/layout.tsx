import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { UserCog2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Unlock a world of knowledge at PES Events. Sign up today for transformative courses and take the first step toward mastering private equity.",
  alternates: {
    canonical: "https://academy.privateequity-support.com/auth/sign-up",
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grainy">
      <div className="w-full justify-between gap-4 rounded-md align-middle md:flex">
        <div className="flex basis-1/2 flex-col items-center justify-center gap-4 bg-sky-50">
          <Logo />
          <div className="flex items-center gap-2">
            <UserCog2 className="h-8 w-8 text-pes-red" />
            <h1 className="text-2xl font-bold text-pes-red">Signup</h1>
          </div>
          <p className="text-center">
            Join hundreds of students taking their business <br /> knowledge to
            the next level
          </p>
        </div>
        <div className="flex basis-1/2 justify-center px-[5%] align-middle md:py-[10%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
