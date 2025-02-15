import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import { FitnessProvider } from "./contexts/FitnessContext";
import { Home } from "./routes/Home";

function App() {
  return (
    <FitnessProvider>
      <WorkoutProvider>
      <UserProvider>
        <BrowserRouter>
          <Home/>
        </BrowserRouter>
      </UserProvider>
    </WorkoutProvider>
    </FitnessProvider>
  );
}

export default App;