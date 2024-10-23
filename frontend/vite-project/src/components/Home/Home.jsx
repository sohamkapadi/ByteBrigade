import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
// import PopularCategories from "./PopularCategories";
// import PopularCompanies from "./PopularCompanies";
const Home=()=>{
    const {isAuthorized}=useContext(Context);
    if(!isAuthorized){
        return <Navigate to={"/login"} />
    }
    return (
        <section className="homePage page">
            <HeroSection />
            <hr />
            <NewsSection />
            <hr />
        </section>
    )
}

export default Home;