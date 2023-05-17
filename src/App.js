import ConfigRoutes from "./components/ConfigRouter";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className='App container'>
      <Router basename={process.env.PUBLIC_URL}>
        <ConfigRoutes />
      </Router>
    </div>
  );
}

export default App;
