import {
  InputChangeEventDetail,
  IonButton,
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
    <IonList>
      <IonItem>
        <IonLabel>
          <h1>Your information</h1>
        </IonLabel>
        <IonButton slot="end">
          <IonIcon slot="start" icon={pencil} />
          Edit
        </IonButton>
      </IonItem>
      <IonItem>
        <IonIcon slot="start" icon={personOutline} />
        <IonLabel>
          <h2>Contact</h2>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <h2>dewaldcels@outlook.com</h2>
          <h3>Dewald Els</h3>
          <h3>0711234567</h3>
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={locationOutline} />
        <IonLabel>
          <h2>Address</h2>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <h2>Street 123</h2>
          <h3>City</h3>
          <h3>1234</h3>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};

export default ProfileSummary;
