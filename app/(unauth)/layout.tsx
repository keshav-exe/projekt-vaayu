import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-full">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MarketingLayout;
