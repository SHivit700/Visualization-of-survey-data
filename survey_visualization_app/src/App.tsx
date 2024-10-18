import { Routes, Route } from 'react-router-dom';
import {HomePage} from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default route for the web-app */}
        <Route path="/" element={<HomePage />} />      
      </Routes>
    </div>
  );
}

export default App;
