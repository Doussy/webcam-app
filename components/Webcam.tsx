import React, { useEffect, useRef } from "react";

const Webcam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
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
        className="mx-auto w-full md:w-2/3 lg:w-1/2 -scale-x-100 bg-black"
        ref={videoRef}
      />
    </>
  );
};

export default Webcam;
