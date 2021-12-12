import React, { useEffect, useRef, useState } from "react";
import classNames from "../utils/classNames";

type ComponentProps = {
  streamEnabled: boolean;
  sepiaFilter: boolean;
  inputType: "webcam" | "screen_share";
};

const Stream: React.FC<ComponentProps> = ({
  streamEnabled,
  sepiaFilter,
  inputType = "screen_share",
}) => {
  const [mediaStream, setMediaStream] = useState(null);

  const videoRef = useRef(null);

  useEffect(() => {
    streamEnabled ? enableStream() : disableStream();
  }, [streamEnabled, inputType]);

  const enableStream = () => {
    inputType === "webcam" ? setWebcam() : setScreenShare();
  };

  const disableStream = () => {
    mediaStream && mediaStream.getTracks().forEach((track) => track.stop());
    let video = videoRef.current;
    video.srcObject = null;
  };

  const setWebcam = () => {
    disableStream();
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

  const setScreenShare = () => {
    disableStream();
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
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
        className={classNames(
          "mx-auto w-full md:w-2/3 lg:w-1/2 bg-black aspect-video",
          sepiaFilter ? "sepia" : "",
          inputType === "webcam" ? "-scale-x-100" : ""
        )}
        ref={videoRef}
      />
    </>
  );
};

export default Stream;
