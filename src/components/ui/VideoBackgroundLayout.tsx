import { ChildrenPropsType } from "../../lib/types";

const VideoBackgroundLayout = ({ children }: ChildrenPropsType) => {
  return (
    <section className="w-screen h-screen absolute right-0">
      <video
        autoPlay
        loop
        muted
        className="absolute sm:text-white top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/videos/xplore-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      {children}
    </section>
  );
};

export default VideoBackgroundLayout;
