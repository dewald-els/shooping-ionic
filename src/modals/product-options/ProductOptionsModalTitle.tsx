import { IonBadge, IonText } from "@ionic/react";
import { Product } from "../../models/product";

type ProductOptionsTitleProps = {
  product?: Product;
};

const ProductOptionsModalTitle: React.FC<ProductOptionsTitleProps> = (
  props
) => {
  const { product } = props;
  return (
    <div className="ion-padding">
      <IonBadge>{product?.category}</IonBadge>
      <IonText>
        <h2 className="margin-bottom-0 margin-top-0">{product?.name}</h2>
      </IonText>
      <IonText color={"medium"}>
        <p className="margin-top-0">{product?.description}</p>
      </IonText>
    </div>
  );
};

export default ProductOptionsModalTitle;
