import DashboardItem from "@/components/sections/DashboardItem";
import ProfiileDashboardItem from "@/components/sections/ProfiileDashboardItem";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Profile",
  description: "Your Zanzelle Profile",
};
export default function Profile() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        <ProfiileDashboardItem />
      </PageBorders>{" "}
    </div>
  );
}
