import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MarketingLayout;
