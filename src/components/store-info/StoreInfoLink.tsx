import { IonButton, IonIcon } from "@ionic/react";
import { StoreInfo } from "../../models/store-info";
import { getIconFromString } from "../../utils/getIconFromString";

type StoreInfoLinkProps = {
  storeInfo: StoreInfo;
};

export const StoreInfoLink = (props: StoreInfoLinkProps) => {
  const { storeInfo } = props;
  const { label, value, icon } = storeInfo;
  const handleLinkClick = () => {
    window.open(value, "_blank");
  };
  return (
    <div className="ion-padding">
      <IonButton onClick={handleLinkClick}>
        <IonIcon slot="start" icon={getIconFromString(icon)} />
        {label}
      </IonButton>
    </div>
  );
};

export default StoreInfoLink;
