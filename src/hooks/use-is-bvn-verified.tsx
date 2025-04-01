import ensureError from "@/lib/ensure-error";
import whoami from "@/services/account/whoami";
import useAppSelectors from "@/store/use-app-selectors";
import * as React from "react";
import { toast } from "sonner";
export default function useIsBvnVerified() {
  const { account } = useAppSelectors("account");
  const [isBvnVerified, setBvnVerified] = React.useState(
    account?.user_verifications?.has_verified_bvn,
  );

 const checkBvnVerification = React.useCallback(async (): Promise<boolean> => {
   try {
     const user = await whoami();
     const has_verified_bvn =
       user?.user_verifications?.has_verified_bvn ?? false;

     setBvnVerified(has_verified_bvn);

     if (!has_verified_bvn) {
       throw new Error("To access this feature, you need to verify your BVN");
     }

     return true;
   } catch (err) {
     toast.info(ensureError(err).message, {
       duration: 8000,
       closeButton: true,
     });

     throw err;
   }
 }, []);


  return { isBvnVerified, checkBvnVerification };
}
