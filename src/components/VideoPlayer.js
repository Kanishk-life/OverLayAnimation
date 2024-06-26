import React, { useRef, useEffect, useState } from "react";
import useColor from "@/hooks/useColor";
import { Button } from "@/components/index";
import useAnimation from "@/hooks/useAnimation";
import useSubtitles from "@/hooks/useSubtitles";

const VideoPlayer = ({ videoFile, srtFile }) => {
  const videoRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const { generateRandomColor, color } = useColor();
  const { handlerThemChange, selectedThem } = useAnimation();
  const { currentSubtitle, setCurrentSubtitle, subtitles } =
    useSubtitles(srtFile);

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [videoFile]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime;
      generateRandomColor();

      const activeSubtitle = subtitles.find(
        (sub) => currentTime >= sub.startTime && currentTime <= sub.endTime
      );

      if (activeSubtitle) {
        setCurrentSubtitle(activeSubtitle.word);
        setToggle(true);
        setTimeout(() => setToggle(false), 100);
      } else {
        setCurrentSubtitle("");
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [subtitles]);

  if (!videoFile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex items-center justify-center gap-5 flex-col py-10">
      <div
        className="flex flex-col justify-center gap-5 w-full"
        style={{ position: "relative" }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full h-screen"
          onPlay={() => {
            setToggle(true);
          }}
          onPause={() => {
            setToggle(false);
          }}
        />
        <div className="flex justify-center w-full absolute bottom-[26%]">
          <p
            style={{
              color: `${color}`,
              textShadow: `${
                selectedThem === "shake" ? `2px 2px 8px ${color}` : ""
              }`,
            }}
            className={`px-14 capitalize inline-block text-5xl font-bold test-class
              ${selectedThem === "shake" && "shake-shadow"}
              ${selectedThem === "fade" && "fade-border"}
              ${
                (selectedThem === "bounce-float" || "bounce") &&
                `bounceFloat-border`
              } ${toggle && selectedThem}`}
          >
            {currentSubtitle}
          </p>
        </div>
      </div>
      <div className="text-white">
        <div className="w-4/5 m-auto flex items-center justify-between gap-5">
          <Button
            className="border-blue-500 text-blue-500"
            value="bounce"
            name="bounce"
            onClick={handlerThemChange}
          />
          <Button
            className="border-yellow-500 text-yellow-500"
            value="shake"
            name="shake"
            onClick={handlerThemChange}
          />
          <Button
            className="border-green-500 text-green-500"
            value="fade"
            name="fade"
            onClick={handlerThemChange}
          />
          <Button
            className="border border-red-500 text-red-500"
            value="bounce-float"
            name="float"
            onClick={handlerThemChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
