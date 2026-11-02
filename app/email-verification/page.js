import React, { Suspense } from "react";
import VerificationForm from "@/components/forms/VerificationForm";
import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

export const metadata = {
  title: "Zanzelle email verification",
  description: "Welcome to Zanzelle",
};
const EmailVerification = () => {
  return (
    <PageBorders>
      <AuthItem>
        <Suspense
          fallback={
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-main-white">Loading verification...</p>
            </div>
          }
        >
          <VerificationForm />
        </Suspense>
      </AuthItem>
    </PageBorders>
  );
};

export default EmailVerification;
