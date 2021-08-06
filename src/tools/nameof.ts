const nameof = <T>(prop: keyof T) => {
  return prop.toString();
};

export default nameof;
