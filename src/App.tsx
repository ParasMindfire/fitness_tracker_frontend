import { Home } from "./routes/Home";
import { ToastContainer } from "react-toastify";
import Providers from "./contexts/Providers";
import Layout from "./Layouts/Layout";

//App component that sets up the application with necessary context providers and routing
function App() {
  return (
    <Providers>
      <Layout>
        <ToastContainer/>
        <Home/>
      </Layout>
    </Providers>    
  );
}

export default App;