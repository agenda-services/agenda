import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { Appointments } from "./pages/Appointments";

function App() {
  return (
    <MainLayout>
      <Appointments />
    </MainLayout>
  );
}

export default App;
