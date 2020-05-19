import React, { useEffect } from 'react';
import { loadSectionsFromApi } from '../../api/sections-service';
import Section from '../../classes/section';
import * as SectionsActions from '../../redux/actions/sections.actions';
import { store } from '../../redux/reducers/root.reducer';
import { SidebarItems } from './sidebar-items';
import './sidebar.scss';


export const Sidebar: React.FC = () => {
    
    useEffect(() => {
        loadSectionsFromApi().then((sections: Section[]) => {
            store.dispatch({ type: SectionsActions.LOADED_SECTIONS, sections: sections });
        });
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                Technolibrary
            </div>           
            <SidebarItems ></SidebarItems>        
        </div>
    );
}

export default Sidebar