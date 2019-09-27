import Section from "../../classes/section";

export const IDLE_c = 'IDLE';
export const LOADING_SECTIONS_c = 'LOADING_SECTIONS';
export const LOADED_SECTIONS_c = 'LOADED_SECTIONS';
export const LOAD_SECTIONS_FAILED_c = 'LOAD_SECTIONS_FAILED';

export type IDLE = typeof IDLE_c;
export type LOADING_SECTIONS = typeof LOADING_SECTIONS_c;
export type LOADED_SECTIONS = typeof LOADED_SECTIONS_c;
export type LOAD_SECTIONS_FAILED =  typeof LOAD_SECTIONS_FAILED_c;
export type SECTIONS = 
                IDLE |
                LOADING_SECTIONS | 
                LOADED_SECTIONS | 
                LOAD_SECTIONS_FAILED;

export interface ILoadingSectionsAction {
    type: LOADING_SECTIONS;
}

export interface ILoadedSectionsAction {
    type: LOADED_SECTIONS;
    sections: Section[];    
}

export interface ILoadSectionsFailedAction {
    type: LOAD_SECTIONS_FAILED;
    errorMsg: string;    
}

export type Actions = 
        ILoadingSectionsAction | 
        ILoadedSectionsAction | 
        ILoadSectionsFailedAction

