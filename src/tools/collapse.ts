// eslint-disable-next-line consistent-return
const slidetoggle = (element: any): any => {
  const ch = element.clientHeight;
  const sh = element.scrollHeight;
  const isCollapsed = !ch;
  const noHeightSet = !element.style.height;

  element.style.height = `${isCollapsed || noHeightSet ? sh : 0}px`;
  if (noHeightSet) {
    return slidetoggle.call(element, element);
  }
};

export default slidetoggle;
