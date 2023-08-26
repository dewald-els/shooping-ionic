import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { StoreInfo } from "../../models/store-info";
import { getIconFromString } from "../../utils/getIconFromString";

type StoreInfoPhoneProps = {
  storeInfo: StoreInfo;
};

export const StoreInfoPhone = (props: StoreInfoPhoneProps) => {
  const { storeInfo } = props;
  const { label, value, icon } = storeInfo;
  return (
    <IonItem>
      <IonIcon slot="start" icon={getIconFromString(icon)} color="primary" />
      <IonLabel>{label}</IonLabel>
      <IonLabel slot="end">
        <a href={`tel:${value}`}>{value}</a>
      </IonLabel>
    </IonItem>
  );
};

export default StoreInfoPhone;
