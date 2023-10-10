import { IonBadge, IonText } from "@ionic/react";
import { Product } from "../../models/product";

type ProductOptionsModalImageProps = {
  product?: Product;
};

const ProductOptionsModalImage: React.FC<ProductOptionsModalImageProps> = (
  props
) => {
  const { product } = props;
  return (
    <img
      src="https://via.placeholder.com/600x300"
      style={{
        objectFit: "cover",
        minHeight: "200px",
        backgroundColor: "var(--ion-color-medium)",
      }}
      alt={product?.name}
    />
  );
};

export default ProductOptionsModalImage;
