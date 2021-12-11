import Layout from "../components/Layout";
import Webcam from "../components/Webcam";

const IndexPage = () => (
  <Layout title="Home | Webcam App">
    <div className="m-4 text-center">
      <div className="text-2xl">Webcam App</div>
      <Webcam />
    </div>
  </Layout>
);

export default IndexPage;
