import { IonText, IonInput } from "@ionic/react";

const CreateAccountContact = () => {
  return (
    <>
      <IonText>
        <h4>Contact</h4>
      </IonText>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="fullName"
          name="fullName"
          label="Full name"
          fill="outline"
          labelPlacement="floating"
          placeholder="John Doe"
          type="text"
        />
      </div>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="phoneNumber"
          name="phoneNumber"
          label="Phone number"
          fill="outline"
          labelPlacement="floating"
          placeholder="071 123 4567"
          type="tel"
        />
      </div>
    </>
  );
};

export default CreateAccountContact;
