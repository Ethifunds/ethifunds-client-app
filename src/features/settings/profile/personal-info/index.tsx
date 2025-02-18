import { TabsContent } from "@/components/ui/tabs";
import Form from "./form";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import VerifyBvnPrompt from "@/components/prompts/verify-bvn-prompt";
export default function PersonalInfo() {
  const { account } = useAppSelector((state) => state.account);

  const isBvnVerified = React.useMemo(() => {
    return account?.user_verifications?.has_verified_bvn;
  }, [account?.user_verifications?.has_verified_bvn]);
  return (
    <TabsContent value="personal_info">
      {!isBvnVerified ? <VerifyBvnPrompt /> : <Form />}
    </TabsContent>
  );
}
