import { IonList, IonItem, IonLabel, IonText } from "@ionic/react";
import { CartProductOption } from "../../models/cart";
import formatCurrency from "../../utils/formatCurrency";

type OrderHistoryDetailProductsProps = {
  products: CartProductOption[];
};
const OrderHistoryDetailProducts: React.FC<OrderHistoryDetailProductsProps> = (
  props
) => {
  const { products } = props;
  return (
    <>
      <IonList>
        {products.map((option) => {
          const priceCurrency = formatCurrency(
            option.unit_price * option.quantity
          );

          return (
            <IonItem key={option.id}>
              <IonLabel>
                <h2>
                  {option.quantity} x {option.name}
                </h2>
                <p></p>
              </IonLabel>
              <IonLabel slot="end" color="medium">
                {priceCurrency}
              </IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

export default OrderHistoryDetailProducts;
