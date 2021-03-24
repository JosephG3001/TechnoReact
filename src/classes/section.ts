export default class Section {
  sectionId: string;

  parentSectionId: string;

  parentSectionName: string;

  inverseParentSection: Array<Section>;

  sectionName: string;

  displayOrder: number;

  icon: string;
}
