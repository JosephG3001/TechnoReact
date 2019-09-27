import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './top-nav.scss';

interface IProps {}
interface ITopNavState {
    topMenuLinks: Array<TopMenuLink>
}

class TopNavState implements ITopNavState {
    topMenuLinks: TopMenuLink[] = [
        { icon: 'home', url: '/', linkText: 'Home' },
       // { icon: 'emoji_people', url: '/', linkText: 'About' },      
    ];
}

class TopMenuLink {
    url: string = '';
    icon: string = '';
    linkText: string = '';
}

export default class TopNav extends React.Component<IProps, ITopNavState> {
    constructor(props: ITopNavState) {
        super(props);
        this.state = new TopNavState();
    }

    render() {
        return (
                <nav className="top-nav">
                    <ul className="top-nav-menu-items">
                        {this.state.topMenuLinks.map(item => (
                                <li key={item.linkText} className="top-nav-menu-item">
                                <Link to="/">
                                    <i className="top-nav-menu-item-icon material-icons">{item.icon}</i>
                                    <span className="top-nav-menu-item-text">{item.linkText}</span>
                                </Link>
                            </li>                                
                        ))}
                        {
                        <li className="top-nav-menu-item">
                            <a href="http://angular.technolibrary.co.uk/" target="_blank">
                                <i className="top-nav-menu-item-icon material-icons">restore_page</i>
                                <span className="top-nav-menu-item-text">
                                Angular Site
                            </span>
                            </a>
                        </li>                    
                        }
                        {
                        <li className="top-nav-menu-item">
                            <a href="http://www.technolibrary.co.uk/" target="_blank">
                                <i className="top-nav-menu-item-icon material-icons">language</i>
                                <span className="top-nav-menu-item-text">
                                Classic Site
                            </span>
                            </a>
                        </li>                                
                        }
                    </ul>
                </nav>
        );
    }
}

