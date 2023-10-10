import {
  InputChangeEventDetail,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { Profile } from "../../models/profile";
import { User } from "@supabase/supabase-js";
import {
  locationOutline,
  pencil,
  pencilOutline,
  personOutline,
} from "ionicons/icons";

type ProfileProps = {
  user: User | undefined;
  profile: Profile | null;
};

const ProfileSummary: React.FC<ProfileProps> = (props) => {
  const { profile, user } = props;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Your information</IonCardTitle>
      </IonCardHeader>
      <IonList>
        <IonItem>
          <IonIcon slot="start" icon={personOutline} color="primary" />
          <IonLabel>Contact</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Dewald Els</h3>
            <h2>dewaldcels@outlook.com</h2>
            <h3>0711234567</h3>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={locationOutline} color="primary" />
          <IonLabel>Delivery Address</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>Street 123</h2>
            <h3>City</h3>
            <h3>1234</h3>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonCardContent>
        <IonButton slot="end" fill="outline" expand="block">
          <IonIcon slot="start" icon={pencil} />
          Edit
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileSummary;
