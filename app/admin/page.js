import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Admin",
  description: " Zanzelle admin dashboard",
};
export default function Home() {
  return (
    <div className="min-h-screen">
      <PageBorders>admin dashboard</PageBorders>{" "}
    </div>
  );
}
