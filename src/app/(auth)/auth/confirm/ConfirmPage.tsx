"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { DashboardPages } from "@/config/dashboard-pages";
import { PublicPages } from "@/config/public-pages";

export function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token_hash = params.get("token_hash");
      const type = params.get("type") as "email" | "magiclink";

      if (!token_hash || !type) {
        return router.replace(PublicPages.LOGIN);
      }

      const supabase = createClient();

      const { error: verifyError } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (verifyError) {
        console.error("OTP verification failed:", verifyError);
        return router.replace(PublicPages.LOGIN);
      }

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        console.error("Session retrieval failed:", sessionError);
        return router.replace(PublicPages.LOGIN);
      }

      router.replace(DashboardPages.BASE);
    };

    verifyToken();
  }, []);

  return <div>Verifying your email... Please wait</div>;
}
