import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Main } from "./pages/main";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
