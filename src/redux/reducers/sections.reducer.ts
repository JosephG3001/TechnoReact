import Section from "../../classes/section";
import * as SectionsActions from '../actions/sections.actions';

export interface ISectionsState {
    currentAction: SectionsActions.AllSectionsAction;
    menuItems: Array<Section>;
    currentTech?: Section;
    currentSubSection?: Section;
}

export const InitialSectionsState: ISectionsState = {
    currentAction: SectionsActions.SECTIONS_IDLE,
    menuItems: new Array<Section>(),    
}

export function sectionsReducer(state: ISectionsState = InitialSectionsState, action: SectionsActions.Actions): ISectionsState {
    switch (action.type) {
        case (SectionsActions.LOADING_SECTIONS): {
            return {
                ...state,
                currentAction: SectionsActions.LOADING_SECTIONS
            }
        }

        case (SectionsActions.LOADED_SECTIONS): {
            return {
                ...state,
                menuItems: action.sections,
                currentAction: SectionsActions.LOADED_SECTIONS
            }
        }

        case (SectionsActions.LOAD_SECTIONS_FAILED): {
            return {
                ...state,
                currentAction: SectionsActions.LOAD_SECTIONS_FAILED
            }
        }

        case (SectionsActions.SET_CURRENT_TECH): {
            return {
                ...state,
                currentTech: action.section,
            }
        }

        case (SectionsActions.SET_CURRENT_SUBSECTION): {
            return {
                ...state,
                currentSubSection: action.section,
            }
        }

        default:
            return state;
    }
}