// import SignUpForm from "@/components/forms/SignUpForm";
import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Sign-Up",
  description: "Sign-Up to Zanzelle",
};
export default function SingUp() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <AuthItem>Sign-up {/* <SignUpForm /> */}</AuthItem>
      </PageBorders>{" "}
    </div>
  );
}
