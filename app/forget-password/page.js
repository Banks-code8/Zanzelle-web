import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Forget-Password",
  description: "Forget Zanzelle Password",
};
export default function ForgetPassword() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <AuthItem>Forget-Password </AuthItem>
      </PageBorders>{" "}
    </div>
  );
}
