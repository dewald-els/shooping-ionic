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
      src={product?.image}
      style={{
        objectFit: "cover",
        minHeight: "200px",
        maxHeight: "300px",
        width: "100%",
        backgroundColor: "var(--ion-color-medium)",
      }}
      alt={product?.name}
    />
  );
};

export default ProductOptionsModalImage;
