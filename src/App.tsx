import { Home } from "./routes/Home";
import { ToastContainer } from "react-toastify";
import Providers from "./contexts/Providers";

//App component that sets up the application with necessary context providers and routing
function App() {
  return (
    <Providers>
      <ToastContainer/>
      <Home/>
    </Providers>    
  );
}

export default App;