import LandingNavbar from "@/components/LandingNavbar";

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default ErrorLayout;
