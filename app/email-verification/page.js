import React, { Suspense } from "react";
import VerificationForm from "@/components/forms/VerificationForm";
import AuthItem from "@/components/sections/AuthItems";
import PageBorders from "@/components/wrappers/PageBorders";

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
