import { assets } from "@/constants";

export default function VerifyBvnPrompt() {
  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <div>
        <img src={assets.verify_bvn_01} alt="verify-bvn" />
      </div>

      <div className="lg:w-3/4 space-y-3 text-center">
        <h1 className="feature-standard text-neutral-1000">
          Kindly Verify your BVN
        </h1>
        <span className="highlight-standard block bg-white text-neutral-500">
          Kindly add your BVN information access your profile for updates
        </span>
      </div>
    </div>
  );
}
