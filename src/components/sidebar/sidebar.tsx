import React from 'react';
import './sidebar.scss';

import SidebarHeader from './sidebar-header';
import SidebarItems from './sidebar-items';


export default class Sidebar extends React.Component {
    
    render () {
        return (
            <div className="sidebar">
                <SidebarHeader></SidebarHeader>                
                <SidebarItems ></SidebarItems>
                
            </div>
        );
    }
}
