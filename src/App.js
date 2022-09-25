import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Addpost from "./pages/addpost";
import Home from "./pages/Home";
import Post from "./pages/post";


function App() {
  return (
    <div className=" bg-[#f5f5f5] md:px-28 py-2 pb-10 ">
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/posts/:id" element={<Post/>}/>
      <Route path="/addpost" element={<Addpost />} />
     </Routes>
    </div>
  );
}

export default App;
