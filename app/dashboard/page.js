import AuthItem from "@/components/sections/AuthItems";
import DashboardItem from "@/components/sections/DashboardItem";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle daashboard",
  description: "Make transaction with Zanzelle",
};
export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <DashboardItem />
      </PageBorders>{" "}
    </div>
  );
}
