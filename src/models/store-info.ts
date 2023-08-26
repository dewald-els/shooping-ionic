export interface StoreInfo {
  id: number;
  type: StoreInfoType;
  label: string;
  value: string;
  active: boolean;
  icon: string;
}

export enum StoreInfoType {
  csv = "csv",
  link = "link",
  phone = "phone",
}
