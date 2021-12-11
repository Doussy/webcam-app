import React, { useState } from "react";
import Layout from "../components/Layout";
import Webcam from "../components/Webcam";

const IndexPage = () => {
  const [streamEnabled, setStreamEnabled] = useState(true);
  const [sepiaFilter, setSepiaFilter] = useState(false);
  const [inputType, setInputType] = useState<"webcam" | "screen_share">(
    "webcam"
  );

  return (
    <Layout title="Home | Webcam App">
      <div className="m-4 text-center">
        <div className="text-2xl mb-4">Webcam App</div>
        <Webcam
          streamEnabled={streamEnabled}
          sepiaFilter={sepiaFilter}
          inputType={inputType}
        />
        <div className="flex justify-center my-6 gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setSepiaFilter(!sepiaFilter)}
          >
            {sepiaFilter ? "Disable" : "Enable"} Sepia Filter
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setStreamEnabled(!streamEnabled)}
          >
            {streamEnabled ? "Disable" : "Enable"} Stream
          </button>
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() =>
              setInputType(inputType === "webcam" ? "screen_share" : "webcam")
            }
          >
            {inputType === "webcam"
              ? "Switch to Screen Share"
              : "Switch to Webcam"}
          </button>
      </div>
    </Layout>
  );
};

export default IndexPage;
