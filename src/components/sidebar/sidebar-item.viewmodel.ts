// typescript 2.7 has strict class initialisation 
// which means suffixing props with ! to denote 

import Section from "../../classes/section";

export default class SidebarItemViewModel {
    constructor(public section: Section, public level: number){

    }
}