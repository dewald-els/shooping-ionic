import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const TermsAndConditionsScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Terms and conditions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText>
          <h4>Introduction</h4>
        </IonText>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          dolores ipsum libero commodi voluptatem, provident quas atque,
          accusantium nesciunt alias quibusdam laudantium quam distinctio! Hic
          incidunt ratione eum debitis facere at, ex quia culpa rerum rem ut
          enim dolorem officiis numquam unde libero, veniam ea eos.
        </p>

        <IonText>
          <h4>Your information</h4>
        </IonText>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic numquam
          delectus voluptatum consequuntur, dolores ea quos culpa cupiditate
          aspernatur impedit.
        </p>

        <IonText>
          <h4>Membership</h4>
        </IonText>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, magnam
          placeat, omnis incidunt possimus consectetur nostrum sit nisi laborum,
          distinctio officia culpa autem consequatur iure.
        </p>

        <IonText>
          <h4>Orders</h4>
        </IonText>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
          doloremque.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndConditionsScreen;
