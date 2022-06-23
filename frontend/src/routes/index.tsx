import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';

function RoutesMain() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesMain;
