import { Outlet } from "react-router-dom";
import AuthHandler from "@/handlers/auth-handler";
import Header from "@/components/header";
import Footer from "@/components/footer";
const PublicLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* handler to store the user data */}
      <AuthHandler />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
