import React from "react";
import News from "../news/news";
import Particles from "../particles/particles-wrapper";
import './landing-page.scss';

export const LandingPage: React.FC = () => {    
    return (
        <div>
            <Particles></Particles>
            <div className="header-wrapper">
                <h1>
                    Technolibrary React Version
                </h1>
                <h2>
                    Programming CMS
                </h2>
            </div>
            <News></News>
        </div>
    );    
}

export default LandingPage;
