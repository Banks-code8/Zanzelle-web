import DashboardItem from "@/components/sections/DashboardItem";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle dashboard",
  description: "Welcome to Zanzelle",
};
export default function Home() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        <DashboardItem />
      </PageBorders>{" "}
    </div>
  );
}
