import { IonItem, IonList, IonListHeader } from "@ionic/react";
import useStoreInfo from "../../hooks/useStoreInfo";
import { StoreInfoType } from "../../models/store-info";
import StoreInfoCSV from "./StoreInfoCSV";
import StoreInfoPhone from "./StoreInfoPhone";
import StoreInfoLink from "./StoreInfoLink";

const StoreInfo = () => {
  const { storeInfo, error } = useStoreInfo();

  return (
    <IonList>
      {storeInfo.map((info) => {
        switch (info.type) {
          case StoreInfoType.csv:
            return <StoreInfoCSV storeInfo={info} key={info.id} />;
          case StoreInfoType.phone:
            return <StoreInfoPhone storeInfo={info} key={info.id} />;
          case StoreInfoType.link:
            return <StoreInfoLink storeInfo={info} key={info.id} />;
          default:
            return null;
        }
      })}
    </IonList>
  );
};

export default StoreInfo;
