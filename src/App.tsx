import { Home } from "./routes/Home";
import Providers from "./contexts/Providers";
import Layout from "./Layouts/Layout";

//App component that sets up the application with necessary context providers and routing
function App() {
  return (
    <Providers>
      <Layout>
        <Home/>
      </Layout>
    </Providers>    
  );
}

export default App;