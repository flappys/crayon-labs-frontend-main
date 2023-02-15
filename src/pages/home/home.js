import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Count from "../../components/Count/Count";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Benefits from "../../components/home/Benefits/Benefits";
import Blockchain from "../../components/home/blockchain/blockchain";
import FAQ from "../../components/home/FAQ/FAQ";
import Hero from "../../components/home/Hero/Hero";
import Launches from "../../components/home/Launches/Launches";
import PRICE from "../../components/home/PRICE/PRICE";
import { LAUNCHES, PAST_LAUNCHES } from "../../utils/globals";

import './home.css';
function Home() {
    return <div>
         <Header></Header>
       <Hero></Hero>
       <div className="blockchain">
       <Blockchain></Blockchain>
       </div>
      
       <Benefits></Benefits>
       <PRICE></PRICE>
      
       <div className="launch2">
       <Launches data={LAUNCHES}></Launches>

       </div>
       <div className="launches" style={{background:'#091C43'}}>
         <div className="pastlaunches">
         <Launches data={PAST_LAUNCHES}></Launches>
         </div>
       
       </div>
     
       
       <FAQ></FAQ>
       <Footer></Footer> 
    
      
    </div>
}

export default Home;