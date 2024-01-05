import LandingNavbar from "@/components/LandingNavbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default DashboardLayout;
