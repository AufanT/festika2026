import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorYou from "@/components/CursorYou";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CursorYou />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
