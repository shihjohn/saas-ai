import LandingNavbar from "@/components/LandingNavbar";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default LoginLayout;
