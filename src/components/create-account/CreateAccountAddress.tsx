import { IonText, IonInput } from "@ionic/react";

const CreateAccountAddress = () => {
  return (
    <>
      <IonText>
        <h4>Address</h4>
      </IonText>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="street"
          name="street"
          label="Street"
          fill="outline"
          labelPlacement="floating"
          placeholder="Street 123"
          type="text"
        />
      </div>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="city"
          name="city"
          label="City"
          fill="outline"
          labelPlacement="floating"
          placeholder="City"
          type="text"
        />
      </div>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="postCode"
          name="postCode"
          label="Post code"
          fill="outline"
          labelPlacement="floating"
          placeholder="Post code"
          type="tel"
        />
      </div>
    </>
  );
};

export default CreateAccountAddress;
