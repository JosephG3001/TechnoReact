import React, { Children } from 'react';
import Section from '../../classes/section';
import SidebarItem from './sidebar-item';
import CircularProgress from '@material-ui/core/CircularProgress';
import './sidebar-items.scss';
import SidebarItemViewModel from './sidebar-item.viewmodel';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers/root.reducer';
import * as SectionActions from '../../redux/actions/sections.actions';
import { ISectionsState, InitialSectionsState } from '../../redux/reducers/sections.reducer';

export interface ISidebarProps {
     state?: ISectionsState;
};

export class SidebarItems extends React.Component<ISidebarProps, ISectionsState> {
    constructor (props: any) {
        super(props);
    }
    
    render() {
        let state = InitialSectionsState;
        if (this.props.state) {
            state = this.props.state;
        }

        if (state.currentAction == SectionActions.LOADING_SECTIONS_c) {
            return (
                <div className="loading-spinner-container">
                    <CircularProgress className="mat-spinner"></CircularProgress>
                    <div>
                        Loading menu...
                    </div>
                </div>   
            ); 
        } else if (state.currentAction == SectionActions.LOAD_SECTIONS_FAILED_c) {
            return (
                <div className="error">
                    Error: {this.props.state!.errorMsg}
                </div>
            );
        } else {
            return (
                <nav>
                    {state.menuItems.map(item => (
                        <SidebarItem key={item.sectionId} children={new SidebarItemViewModel(item, 1)}></SidebarItem>
                    ))}                        
                </nav>      
            );
        }
    }
}

const mapStateToProps = (state: AppState, ownProps: ISidebarProps): ISidebarProps => {
    return {
        ...ownProps,
        state: state.sections
    }    
};

export default connect(
    mapStateToProps,
    {}
)(SidebarItems);