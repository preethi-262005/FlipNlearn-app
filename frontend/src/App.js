import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./Components/Home";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Flashcard from "./Components/Flashcard";
import AddQuestions from "./Components/AddQuestions";
import EditQuestions from "./Components/EditQuestions";
import Admin from "./Components/Admin";
function App() {
  const browserRouter = createBrowserRouter([
    {
      path:'',
      element:<Home/>
    },
    
    {
      path:'/flashcard',
      element:<Flashcard/>

    },
    {
      path:'/addquestion',
      element:<AddQuestions/>
    },
    {
      path:'/admin',
      element:<Admin/>
    },
    {
      path:'/editquestion/:id',
      element:<EditQuestions/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
