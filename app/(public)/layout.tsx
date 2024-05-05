import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Spinner from "@/components/spinner";
import { Suspense } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "VaayuMandal",
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="min-h-screen justify-between flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
    </Suspense>
  );
};

export default PublicLayout;
