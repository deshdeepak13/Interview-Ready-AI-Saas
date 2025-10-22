import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar visible only here */}
      <main className="ml-16 w-full transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
