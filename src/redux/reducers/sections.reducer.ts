import Section from "../../classes/section";
import * as SectionsActions from '../actions/sections.actions';

export interface ISectionsState {
    currentAction: SectionsActions.SECTIONS;
    menuItems: Array<Section>;
    errorMsg: string;
}

export const InitialSectionsState: ISectionsState = {
    currentAction: SectionsActions.IDLE_c,
    menuItems: new Array<Section>(),
    errorMsg: '',
}

export function sectionsReducer(state: ISectionsState = InitialSectionsState, action: SectionsActions.Actions): ISectionsState {
    switch (action.type) {
        case (SectionsActions.LOADING_SECTIONS_c): {
            return {
                ...state,
                currentAction: SectionsActions.LOADING_SECTIONS_c
            }
        }

        case (SectionsActions.LOADED_SECTIONS_c): {
            return {
                ...state,
                menuItems: action.sections,
                currentAction: SectionsActions.LOADED_SECTIONS_c
            }
        }

        case (SectionsActions.LOAD_SECTIONS_FAILED_c): {
            return {
                ...state,
                errorMsg: action.errorMsg,
                currentAction: SectionsActions.LOAD_SECTIONS_FAILED_c
            }
        }

        default:
            return state;
    }
}