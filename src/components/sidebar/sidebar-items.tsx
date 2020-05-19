import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { useSelector } from 'react-redux';
import Section from '../../classes/section';
import * as SectionActions from '../../redux/actions/sections.actions';
import { AppState } from '../../redux/reducers/root.reducer';
import { ISectionsState } from '../../redux/reducers/sections.reducer';
import SidebarItem from './sidebar-item';

export interface ISidebarProps {

};

export const SidebarItems: React.FC<ISidebarProps> = (props) => {
    
    const sectionsState: ISectionsState = useSelector((state: AppState) => state.sections);
    
    return (
        <div>
            {sectionsState.currentAction === SectionActions.LOADING_SECTIONS && 
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading menu...
                    </div>
                </div>
            }

            {sectionsState.currentAction === SectionActions.LOADED_SECTIONS &&
                <nav>
                    {sectionsState.menuItems.map((section: Section) => (
                        <SidebarItem key={section.sectionId} section={section} />
                    ))}
                </nav>   
            }
        </div>
    );
}
