import Section from "../../classes/section";

export const SECTIONS_IDLE = 'SECTIONS_IDLE';
export const LOADING_SECTIONS = 'LOADING_SECTIONS';
export const LOADED_SECTIONS = 'LOADED_SECTIONS';
export const LOAD_SECTIONS_FAILED = 'LOAD_SECTIONS_FAILED';
export const SET_CURRENT_TECH = 'SET_CURRENT_TECH';
export const SET_CURRENT_SUBSECTION = 'SET_CURRENT_SUBSECTION';

export type AllSectionsAction = typeof SECTIONS_IDLE | 
                                typeof LOADING_SECTIONS |
                                typeof LOADED_SECTIONS |
                                typeof LOAD_SECTIONS_FAILED |
                                typeof SET_CURRENT_TECH |
                                typeof SET_CURRENT_SUBSECTION

export interface ILoadingSectionsAction {
    type: typeof LOADING_SECTIONS;
}

export interface ILoadedSectionsAction {
    type: typeof LOADED_SECTIONS;
    sections: Section[];    
}

export interface ILoadSectionsFailedAction {
    type: typeof LOAD_SECTIONS_FAILED;
}

export interface ISetCurrentTechAction {
    type: typeof SET_CURRENT_TECH;
    section: Section;
}

export interface ISetCurrentSubSection {
    type: typeof SET_CURRENT_SUBSECTION;
    section: Section;
}

export type Actions = 
                ILoadingSectionsAction | 
                ILoadedSectionsAction | 
                ILoadSectionsFailedAction |
                ISetCurrentTechAction |
                ISetCurrentSubSection
