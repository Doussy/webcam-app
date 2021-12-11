import React, { useState } from "react";
import Layout from "../components/Layout";
import Webcam from "../components/Webcam";

const IndexPage = () => {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [sepiaFilter, setSepiaFilter] = useState(false);

  return (
    <Layout title="Home | Webcam App">
      <div className="m-4 text-center">
        <div className="text-2xl mb-4">Webcam App</div>
        <Webcam videoEnabled={videoEnabled} sepiaFilter={sepiaFilter} />
        <div className="flex justify-center my-6 gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setSepiaFilter(!sepiaFilter)}
          >
            {sepiaFilter ? "Disable" : "Enable"} Sepia Filter
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? "Disable" : "Enable"} Video
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
