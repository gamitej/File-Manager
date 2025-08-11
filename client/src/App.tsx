import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return token ? <Dashboard /> : <Auth />;
}

export default App;
