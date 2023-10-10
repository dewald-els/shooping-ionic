import { IonList, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";

const ProductOptionsLoader: React.FC = () => {
  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <h3>
            <IonSkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></IonSkeletonText>
          </h3>
          <p>
            <IonSkeletonText
              animated={true}
              style={{ width: "60%" }}
            ></IonSkeletonText>
          </p>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <h3>
            <IonSkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></IonSkeletonText>
          </h3>
          <p>
            <IonSkeletonText
              animated={true}
              style={{ width: "60%" }}
            ></IonSkeletonText>
          </p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ProductOptionsLoader;
