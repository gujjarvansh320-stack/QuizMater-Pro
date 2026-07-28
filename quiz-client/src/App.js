// import AppRoutes from "./routes/AppRoutes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;



import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar"; // --> Add this import (adjust path if needed)

function App() {
  return (
    <>
      {/* 
        Placing the Navbar outside of the routes ensures 
        it renders at the top of every single page. 
      */}
      <Navbar />
      
      {/* Your page content will render below the navbar */}
      <AppRoutes />
    </>
  );
}

export default App;