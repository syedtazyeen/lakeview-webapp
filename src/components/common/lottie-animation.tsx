import dynamic from "next/dynamic";
import React from "react";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  style = {},
  className = "",
}) => {
  return (
    <Player
      src={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
      className={className}
    />
  );
};

export default LottieAnimation;
