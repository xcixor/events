import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: {
    default: "PES Events",
    template: `%s | PES Events`,
  },
  description:
    "Join us on a transformative journey at PES Events, where innovation meets education, developing the leaders of tomorrow's successful enterprises.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col ">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full">
        <Navbar />
      </div>
      <main className="flex-1 pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
