import React, { useState } from "react";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Stream from "../components/Stream";

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
        <Stream
          streamEnabled={streamEnabled}
          sepiaFilter={sepiaFilter}
          inputType={inputType}
        />

        <div className="flex justify-center my-6 gap-4">
          <Button onClick={() => setSepiaFilter(!sepiaFilter)}>
            {sepiaFilter ? "Disable" : "Enable"} Sepia Filter
          </Button>
          <Button onClick={() => setStreamEnabled(!streamEnabled)}>
            {streamEnabled ? "Disable" : "Enable"} Stream
          </Button>
        </div>

        <Button
          onClick={() =>
            setInputType(inputType === "webcam" ? "screen_share" : "webcam")
          }
        >
          {inputType === "webcam"
            ? "Switch to Screen Share"
            : "Switch to Webcam"}
        </Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
