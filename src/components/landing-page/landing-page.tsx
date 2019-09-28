import React from "react";
import News from "../news/news";
import Particles from "../particles/particles-wrapper";
import './landing-page.scss';

export default class LandingPage extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
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
}