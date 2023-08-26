import { IonBadge, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { Product } from "../../models/product";
import { getIconFromString } from "../../utils/getIconFromString";

type ProductOptionsTitleProps = {
  product?: Product;
};

const ProductOptionsModalTitle: React.FC<ProductOptionsTitleProps> = (
  props
) => {
  const { product } = props;
  const category = product?.categories;
  return (
    <div className="ion-padding">
      <IonBadge
        color={category?.color}
        className="flex-inline items-center justify-start"
      >
        {category && <IonIcon icon={getIconFromString(category.icon)} />}
        <IonText className="padding-start-1">{product?.category}</IonText>
      </IonBadge>

      <IonLabel>
        <IonText>
          <h1 className="margin-bottom-0 margin-top-0">{product?.name}</h1>
        </IonText>
        <IonText color={"medium"}>
          <p className="margin-top-0">{product?.description}</p>
        </IonText>
      </IonLabel>
    </div>
  );
};

export default ProductOptionsModalTitle;
