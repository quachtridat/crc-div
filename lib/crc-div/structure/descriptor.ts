export class Descriptor<DescriptionType = string> {
  description: DescriptionType;

  constructor(desc: DescriptionType) {
    this.description = desc;
  }
}

export default Descriptor;