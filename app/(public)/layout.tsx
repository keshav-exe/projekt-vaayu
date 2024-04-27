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
    <div>
      <Suspense fallback={<Spinner />}>
        <Navbar />
        {children}
        <Footer />
      </Suspense>
    </div>
  );
};

export default PublicLayout;
