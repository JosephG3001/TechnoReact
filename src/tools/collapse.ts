
export function slidetoggle(element: any): any {
    const ch = element.clientHeight,
    sh = element.scrollHeight,
    isCollapsed = !ch,
    noHeightSet = !element.style.height;

    element.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
    if (noHeightSet) {
        return slidetoggle.call(element, element);
    }    
  }
  