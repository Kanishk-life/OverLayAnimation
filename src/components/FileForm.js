import React, { useState } from "react";

const FileForm = ({ onSubmit }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedSrt, setSelectedSrt] = useState(null);

  const handleVideoChange = (e) => {
    setSelectedVideo(e.target.files[0]);
  };

  const handleSrtChange = (e) => {
    setSelectedSrt(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedVideo, selectedSrt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white flex flex-col gap-5 items-center justify-center text-center font-semibold  w-full border border-white rounded-2xl p-20 shadow-lg shadow-fuchsia-50"
    >
      <div className="w-full flex items-center">
        <label className="w-full">Video File:</label>
        <input
          className="w-full"
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          required
        />
      </div>
      <div className="w-full flex items-center">
        <label className="w-full">Subtitle File:</label>
        <input
          className="w-full"
          type="file"
          accept=".srt"
          onChange={handleSrtChange}
          required
        />
      </div>
      <button
        className="w-full items-center bg-green-500 border rounded-lg hover:bg-green-600 transition-all"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FileForm;
