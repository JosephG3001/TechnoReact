import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Section from '../../classes/section';
import { slidetoggle } from '../../tools/collapse';

export interface ISidebarItemProps {
    section: Section;
}

export const SidebarItem: React.FC<ISidebarItemProps> = (props) => {

    const subMenuRef = React.useRef<HTMLDivElement>(null);
    const [collapsed, setCollapsed] = useState(true);

    function toggleSubMenu(event: React.MouseEvent<HTMLDivElement>) {
        slidetoggle(subMenuRef.current);
        setCollapsed(!collapsed);
    }

    return (
        <React.Fragment>
            <div className="section-parent" onClick={toggleSubMenu}>
                {props.section.inverseParentSection.length === 0 ?
                    <Link to={{ pathname: "/articles/" + encodeURIComponent(props.section.parentSectionName) + '/' + encodeURIComponent(props.section.sectionName) }}>
                        <i className="material-icons section-icon">data_usage</i>
                        <span className="section-text">
                            {props.section.sectionName}
                        </span>
                    </Link>  
                    :   
                    <div className="sidebar-link">
                        <span className="section-text">
                            {props.section.sectionName}
                        </span>
                        <i className={"noselect material-icons rotate " + (!collapsed ? "deg90" : "")}>
                            keyboard_arrow_right
                        </i>
                    </div>
                }
            </div>
            <div className="section-children collapse" ref={subMenuRef} style={{ height: "0px" }}>
                {props.section.inverseParentSection.map((section: Section) => (
                    <SidebarItem key={section.sectionId} section={section} />
                 ))}
            </div>
        </React.Fragment>
    );
}

export default SidebarItem;