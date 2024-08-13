import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Home.css'; 
import { useNavigate } from 'react-router-dom';
function Home() {
  let navigate=useNavigate();
  return (
    <div className=" id10 Home">
      <Header />
      <div className="background-image">
        <div className="content">
          <h1 className="heading">
            Flip
            <br />
           <span className='heading-part'><b>N</b></span> 
            <br/>
            Learn
          </h1>
          <div className="buttons">
            <button className="btn admin-btn"onClick={()=>navigate("/admin")} >Admin</button>
            <button className="btn user-btn"onClick={()=>navigate("/flashcard")}>User</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
