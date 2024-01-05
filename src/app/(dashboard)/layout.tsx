import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[20] bg-slate-50 dark:bg-gray-950">
          <Sidebar />
        </div>
        <main className="md:pl-72">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
