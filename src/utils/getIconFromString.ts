import * as Icon from "ionicons/icons";

/**
 * Provide a string and get the corresponding Ionicon
 * @param iconName {string} - The name of the icon to get
 * @returns
 */
export const getIconFromString = (iconName: string) => {
  //@ts-ignore
  return Icon[iconName];
};
