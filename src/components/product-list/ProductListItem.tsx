import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { Product } from "../../models/product";

type ProductListItemProps = {
  product: Product;
  onProductClick: (product: Product) => void;
};

const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product, onProductClick } = props;
  return (
    <IonItem button onClick={() => onProductClick(product)}>
      <IonLabel>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </IonLabel>
      <IonThumbnail></IonThumbnail>
    </IonItem>
  );
};

export default ProductListItem;
