import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Email-Verification",
  description: "Verify Zanzelle email",
};
export default function ForgetPassword() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <AuthItem>Email-Verification </AuthItem>
      </PageBorders>{" "}
    </div>
  );
}
