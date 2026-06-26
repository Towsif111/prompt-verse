import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";


const DashboardLayout = ({ children }) => {
  return (
      <div className="flex min-h-screen">
        <DashboardSidebar/>
        <div className="flex-1 transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>{children}</div>
      </div>

  );
};

export default DashboardLayout;