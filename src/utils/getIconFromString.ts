import * as Icon from "ionicons/icons";

/**
 * Provide a string and get the corresponding Ionicon
 * @param iconName {string} - The name of the icon to get
 * @returns
 */
export const getIconFromString = (iconName: string) => {
  const [...parts] = iconName.split("-");
  const iconCamel = parts
    .map((part, idx) => {
      if (idx === 0) {
        return part;
      } else {
        return part[0].toUpperCase() + part.slice(1);
      }
    })
    .join("");
  //@ts-ignore
  return Icon[iconCamel];
};
