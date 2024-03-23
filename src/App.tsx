import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home";
import Question from "./components/Question";
import Knowledge from "./components/Knowledge";
import Notice from "./components/Notice";
import Community from "./components/Community";
import Event from "./components/Event";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/community" element={<Community />} />
          <Route path="/event" element={<Event />} />
          <Route path="/notice/info" element={<Notice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
