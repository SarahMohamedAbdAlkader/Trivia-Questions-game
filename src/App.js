import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "pages/HomePage";
import CategoriesPage from "pages/CategoriesPage";
import GameQuestions from "pages/GameQuestions";
import ScoreScreen from "pages/ScoreScreen";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoriesPage />} />
          <Route path="/game-questions" element={<GameQuestions />} />
          <Route path="/score" element={<ScoreScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
