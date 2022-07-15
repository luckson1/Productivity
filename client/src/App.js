import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Kanban from './pages/Kanban';
import ShoppingList from './pages/ShoppingList';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home />} />
      <Route exact path="/kanban" element={<Kanban />} />     
      <Route exact path="/shopping-list" element={<ShoppingList />} />  

    </Routes>
  </BrowserRouter>
  );
}

export default App;
