import VerificationForm from "@/components/forms/VerificationForm";
import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Login",
  description: "Login to Zanzelle",
};
export default function EmailVerification() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <AuthItem>
          {" "}
          <VerificationForm />{" "}
        </AuthItem>
      </PageBorders>{" "}
    </div>
  );
}
