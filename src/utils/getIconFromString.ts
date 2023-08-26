import * as Icon from "ionicons/icons";

export const getIconFromString = (iconName: string) => {
  //@ts-ignore
  return Icon[iconName];
};
