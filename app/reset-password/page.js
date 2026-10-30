import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Recover-Password",
  description: "Recover Zanzelle Password",
};
export default function RecoverPassword() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <AuthItem>Recover-Password </AuthItem>
      </PageBorders>{" "}
    </div>
  );
}
