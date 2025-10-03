import { Route, Routes } from "react-router-dom"; // FIXED
import HomePage from "./Pages/HomePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import CreatePage from "./Pages/CreatePage";


const App = () => {
  return (
    <div data-theme="coffee" className="relative h-full w-full">
       <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#0F0F0F_100%)]">
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
