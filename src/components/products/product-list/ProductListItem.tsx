import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { Product } from "../../../models/product";

type ProductListItemProps = {
  product: Product;
  onProductClick: (product: Product) => void;
};

const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product, onProductClick } = props;
  return (
    <IonItem
      button
      onClick={() => onProductClick(product)}
      style={{
        marginBottom: "0.35rem",
      }}
    >
      <IonThumbnail
        slot="start"
        style={{
          "--border-radius": "0.35rem",
        }}
      >
        <img src="https://via.placeholder.com/300x300" alt={product.name} />
      </IonThumbnail>
      <IonLabel>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ProductListItem;
