import { ComponentExample } from "@/components/component-example";
import LandingPage from "./(landing)/landing/page";
import CineScoreLoading from "@/components/cinescore-loading";

export default function Page() {
  return (
    <div>
      <LandingPage />
      {/* <CineScoreLoading isOpen={true} /> */}
    </div>
  );
}
