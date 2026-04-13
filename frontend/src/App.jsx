import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/signup" element={<SignUp/>}/>
  <Route path="/login" element={<LogIn/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
};

export default App;