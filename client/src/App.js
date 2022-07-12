import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Kanban from './pages/Kanban';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home />} />
      <Route exact path="/kanban" element={<Kanban />} />     

    </Routes>
  </BrowserRouter>
  );
}

export default App;
