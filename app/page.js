import LoginForm from "@/components/forms/LoginForm";
import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle Login",
  description: "Login to Zanzelle",
};
export default function Home() {
  return (
    <div className="min-h-screen">
      <PageBorders>
        {" "}
        <AuthItem>
          {" "}
          <LoginForm />
        </AuthItem>
      </PageBorders>{" "}
    </div>
  );
}
