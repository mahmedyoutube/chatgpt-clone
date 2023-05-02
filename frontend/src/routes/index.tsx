import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../components/Home/Main";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:conversationId" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
