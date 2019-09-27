import React from 'react';
import './sidebar-item.scss';
import AnimateHeight from 'react-animate-height';
import SidebarItemViewModel from './sidebar-item.viewmodel';
import { Link } from "react-router-dom";


class SidebarItem extends React.Component<{}, SidebarItemViewModel> {
    constructor(props: any) {
        super(props);
        this.state = props.children;
        this.toggleChildren = this.toggleChildren.bind(this);
    }

    toggleChildren() {
        this.setState({            
            section: {
                ...this.state.section,
                visible: !this.state.section.visible
            }
        });
    }

    render() {
        let sectionIcon: any = '';
        if (this.state.level > 1) {
            let icon: string = '';
            switch (this.state.level) {
                case 2: icon = 'data_usage'; break;
                case 3: icon = 'insert_drive_file'; break;
                default: icon = 'insert_drive_file'; break;
            }                     
            sectionIcon = <i className="material-icons section-icon">
                {this.state.section.icon ? this.state.section.icon : icon}
            </i>
        }

        let innerHtml = <div className="section-parent" onClick={this.toggleChildren}>
                            {sectionIcon}
                            <span className="section-text">
                                {this.state.section.sectionName}
                            </span>
                            {this.state.section.inverseParentSection.length > 0 && (
                                <i className={"noselect material-icons rotate " + (this.state.section.visible ? "deg90" : "")}>
                                    keyboard_arrow_right
                                </i>
                            )}                                 
                        </div>;

        return (
            <div key={this.state.section.sectionId}>
                {this.state.section.inverseParentSection.length == 0 ? (
                    <Link to={{ pathname: "/articles/" + encodeURIComponent(this.state.section.parentSectionName) + '/' + encodeURIComponent(this.state.section.sectionName) }}>
                        {innerHtml}
                    </Link>
                    // <Link to={{ pathname: "/articles?id=" + this.state.section.sectionId}}>
                    //     {innerHtml}
                    // </Link>
                ) : (
                    innerHtml
                )}                
                <AnimateHeight height={this.state.section.visible ? 'auto' : 0 }>
                    <div className="section-children">
                        {this.state.section.inverseParentSection.map(item => (
                            <SidebarItem key={item.sectionId} children={new SidebarItemViewModel(item, this.state.level + 1)}></SidebarItem>
                        ))}
                    </div>
                </AnimateHeight>
            </div>            
        );
    }
}

export default SidebarItem;