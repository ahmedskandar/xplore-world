import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkButton from "../../components/ui/LinkButton";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const LandingContent = () => {
  return (
    <main className="absolute flex w-full justify-center">
      <div className="mx-5 mt-8 flex w-full flex-col items-center justify-center rounded-lg bg-black/80 p-6 text-center sm:w-4/5 sm:p-10 lg:w-3/5 lg:px-5 lg:py-14">
        <h1 className="bg-gradient-primary bg-clip-text pb-2 text-2xl font-bold text-transparent sm:text-3xl md:text-4xl xl:text-5xl">
          MAP Your Journey, <br />
          TREASURE Your Memories.
        </h1>
        <p className="mb-14 text-white md:text-lg lg:text-xl">
          Track every step of your adventures with precision, relive your
          experiences, and safeguard your travel memories for a lifetime.
        </p>
        <LinkButton to={"/login"}>
          <span className="hover-effect">Start Tracking</span>
          <FontAwesomeIcon icon={faLocationDot} className="hover-effect" />
        </LinkButton>
      </div>
    </main>
  );
};

export default LandingContent;
