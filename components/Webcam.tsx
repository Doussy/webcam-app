import React, { useEffect, useRef, useState } from "react";

type ComponentProps = {
  videoEnabled: boolean;
  sepiaFilter: boolean;
};

const Webcam: React.FC<ComponentProps> = ({ videoEnabled, sepiaFilter }) => {
  const [mediaStream, setMediaStream] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    videoEnabled
      ? playVideo()
      : mediaStream && mediaStream.getTracks().forEach((track) => track.stop());
  }, [videoEnabled]);

  const playVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 } })
      .then((stream) => {
        setMediaStream(stream);
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <>
      <video
        className={`mx-auto w-full md:w-2/3 lg:w-1/2 -scale-x-100 bg-black ${
          sepiaFilter ? "sepia" : ""
        }`}
        ref={videoRef}
      />
    </>
  );
};

export default Webcam;
