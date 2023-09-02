import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { StoreInfo } from "../../models/store-info";
import { getIconFromString } from "../../utils/getIconFromString";

type StoreInfoChatProps = {
  storeInfo: StoreInfo;
};

export const StoreInfoChat = (props: StoreInfoChatProps) => {
  const { storeInfo } = props;
  const { label, value, icon } = storeInfo;
  const values = value.split(",");
  return (
    <>
      <IonItem>
        <IonIcon slot="start" icon={getIconFromString(icon)} color="primary" />
        <IonLabel>{label}</IonLabel>
        <IonButton href={value}>Chat now</IonButton>
      </IonItem>
    </>
  );
};

export default StoreInfoChat;
