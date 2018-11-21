export enum Type {
  MED = "0",
  REC = "1"
}
export const typeValue = (type: string) => {
  return type == "0" ? "Medical" : "Recreational";
};
