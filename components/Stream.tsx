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
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  const videoRef = useRef(null);

  // Fetch available video input devices (cameras)
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      const videoDevices = deviceInfos.filter(
        (d) => d.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
  }, []);

  useEffect(() => {
    streamEnabled ? enableStream() : disableStream();
    // Clean up on unmount
    return () => disableStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamEnabled, inputType, selectedDeviceId]);

  const enableStream = () => {
    inputType === "webcam" ? setWebcam() : setScreenShare();
  };

  const disableStream = () => {
    mediaStream && mediaStream.getTracks().forEach((track) => track.stop());
    let video = videoRef.current;
    if (video) video.srcObject = null;
  };

  const setWebcam = () => {
    disableStream();
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1280,
          height: 720,
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
        },
      })
      .then((stream) => {
        setMediaStream(stream);
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
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
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
    <>
      {inputType === "webcam" && devices.length > 0 && (
        <div className="mb-4 text-center">
          <label htmlFor="camera-select" className="mr-2 font-medium">Camera:</label>
          <select
            id="camera-select"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="px-2 py-1 rounded border"
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      )}
      <video
        className={classNames(
          "mx-auto w-full md:w-2/3 lg:w-1/2 bg-black aspect-video rounded-2xl",
          sepiaFilter ? "sepia" : "",
          inputType === "webcam" ? "-scale-x-100" : ""
        )}
        ref={videoRef}
      />
    </>
  );
};

export default Stream;
