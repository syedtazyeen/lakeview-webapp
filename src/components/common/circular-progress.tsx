import React from "react";

const CircularProgress = ({ progress }: { progress: number }) => {

  const radius = 56;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const gapAngle = 8;
  const strokeDashoffset =
    circumference - ((progress / 100) * (360 - gapAngle) * circumference) / 360;
  const color =
    progress > 25
      ? progress > 90
        ? "text-green-500"
        : "text-accent"
      : "text-orange-700";

  return (
    <div className="relative h-32 w-32 flex items-center justify-center">
      {/* SVG */}
      <svg
        className="absolute transform rotate-[95deg]"
        height={radius * 2}
        width={radius * 2}
      >
        {/* Background Circle */}
        <circle
          className="text-muted-foreground/10"
          fill="transparent"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference - (gapAngle / 360) * circumference}
          strokeDashoffset={(gapAngle / 2 / 360) * circumference}
        />
        {/* Progress Circle */}
        <circle
          className={color}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference - (gapAngle / 360) * circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.35s ease",
          }}
        />
      </svg>
      {/* Inner Text */}
      <div className="absolute text-xl font-semibold text-gray-800">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default CircularProgress;
