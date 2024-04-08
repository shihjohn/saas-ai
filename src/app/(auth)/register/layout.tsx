import LandingNavbar from "@/components/LandingNavbar";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default RegisterLayout;
