import React,{useState, useEffect} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import AnimRoutes from "./components/AnimRoutes";

function App() {
  const [data, setData] = useState([])
  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem('review-data')) || [])
},[])

const refresher = () =>{
    setData(JSON.parse(localStorage.getItem('review-data')) || [])
}

  return (
    <>
    <Router>
      <AnimRoutes data={data} refresher={refresher}/>
    </Router>
    </>
  );
}

export default App;
