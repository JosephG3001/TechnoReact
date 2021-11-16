import Section from "../classes/section";

const findSection = (sectionId, sections: Section[]) => {
  let section = sections.find((s) => s.sectionId === sectionId);
  if (!section) {
    for (let i = 0; i < sections.length; i++) {
      section = findSection(sectionId, sections[i].inverseParentSection);
      if (section) {
        break;
      }
    }
  }
  return section;
};

export default findSection;
