import ConfigRoutes from "./components/ConfigRouter";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className='App container'>
      <Router>
        <ConfigRoutes />
      </Router>
    </div>
  );
}

export default App;
