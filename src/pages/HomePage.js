"use client";
import React, { useState } from "react";
import FileForm from "@/components/FileForm";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const [videoFile, setVideoFile] = useState(null);
  const [srtFile, setSrtFile] = useState(null);
  const handleFilesSubmit = (video, srt) => {
    setVideoFile(video);
    setSrtFile(srt);
  };

  return (
    <div
      className={`flex items-center h-full justify-center flex-col bg-slate-950 gap-8 pt-10 ${
        !videoFile && !srtFile ? "h-screen" : ""
      }`}
    >
      <h1 className="text-center my-10 text-3xl text-white font-semibold flex justify-center">
        Upload Video and Subtitle Files
      </h1>
      <div className="flex flex-col justify-center gap-5">
        <FileForm onSubmit={handleFilesSubmit} />
        {videoFile && srtFile && (
          <VideoPlayer videoFile={videoFile} srtFile={srtFile} />
        )}
      </div>
    </div>
  );
}
