import { Profile } from "../models/profile";

/**
 * Do a deep check to see if the profile has changed
 * @param initial {Profile}
 * @param updated {Profile}
 * @returns {boolean}
 */
const hasProfileChanged = (initial: Profile, updated: Profile): boolean => {
  const initialWithKeys = initial as unknown as Record<string, string>;
  const updatedWithKeys = updated as unknown as Record<string, string>;
  return Object.keys(initial).some(
    (key: string) => initialWithKeys[key] !== updatedWithKeys[key]
  );
};

export default hasProfileChanged;
