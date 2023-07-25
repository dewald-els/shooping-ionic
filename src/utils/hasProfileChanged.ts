import { Profile } from "../models/profile";

const hasProfileChanged = (initial: Profile, updated: Profile): boolean => {
  const initialWithKeys = initial as unknown as Record<string, string>;
  const updatedWithKeys = updated as unknown as Record<string, string>;
  return Object.keys(initial).some(
    (key: string) => initialWithKeys[key] !== updatedWithKeys[key]
  );
};

export default hasProfileChanged;
