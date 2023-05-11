import ConfigRoutes from "./components/RouterConfig";
import Login from "./pages/login";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className='App'>
      <Router>
        <ConfigRoutes />
      </Router>
    </div>
  );
}

export default App;
