import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { StoreInfo } from "../../models/store-info";
import { getIconFromString } from "../../utils/getIconFromString";

type StoreInfoCSVProps = {
  storeInfo: StoreInfo;
};

export const StoreInfoCSV = (props: StoreInfoCSVProps) => {
  const { storeInfo } = props;
  const { label, value, icon } = storeInfo;
  const values = value.split(",");
  return (
    <>
      <IonItem>
        <IonIcon slot="start" icon={getIconFromString(icon)} color="primary" />
        <IonLabel>{label}</IonLabel>
      </IonItem>
      {values.map((value) => (
        <IonItem key={value}>
          <IonLabel>{value}</IonLabel>
        </IonItem>
      ))}
    </>
  );
};

export default StoreInfoCSV;
