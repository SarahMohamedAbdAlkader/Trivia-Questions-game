import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "pages/HomePage/HomePage";
import CategoriesPage from "pages/CategoriesPage/CategoriesPage";
import GameQuestions from "pages/GameQuestions/GameQuestions";
import ScoreScreen from "pages/ScoreScreen/ScoreScreen";
import NotFound from "pages/NotFound/404";

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
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
