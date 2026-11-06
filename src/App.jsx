import { Route,Routes } from "react-router"
import Navbar from "./component/Navbar"
import NotFound from "./component/NotFound";

import Footer from "./component/Footer";

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App
 