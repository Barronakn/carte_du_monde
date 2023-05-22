import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
