import { IonText, IonInput } from "@ionic/react";

const CreateAccount = () => {
  return (
    <>
      <IonText>
        <h4>Account</h4>
      </IonText>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="emailAddress"
          name="emailAddress"
          label="Email address"
          fill="outline"
          labelPlacement="floating"
          placeholder="example@email.com"
          type="email"
        />
      </div>

      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="password"
          name="password"
          label="Password"
          fill="outline"
          labelPlacement="floating"
          placeholder="******"
          type="password"
        />
      </div>
      <div className="ion-padding-bottom">
        <IonInput
          mode="md"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          fill="outline"
          labelPlacement="floating"
          placeholder="******"
          type="password"
        />
      </div>
    </>
  );
};

export default CreateAccount;
