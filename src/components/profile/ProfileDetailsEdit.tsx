import {
  InputChangeEventDetail,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { Profile } from "../../models/profile";
import { User } from "@supabase/supabase-js";
import { saveOutline } from "ionicons/icons";
import { useState } from "react";
import hasProfileChanged from "../../utils/hasProfileChanged";

type ProfileProps = {
  user: User | undefined;
  profile: Profile | null;
};

const ProfileDetails: React.FC<ProfileProps> = (props) => {
  const { profile, user } = props;
  const [profileRequiresSave, setProfileRequiresSave] =
    useState<boolean>(false);
  const [profileInputs, setProfileInputs] = useState<Profile>({
    id: profile?.id ?? "",
    full_name: profile?.full_name ?? "",
    phone_number: profile?.phone_number ?? "",
    street: profile?.street ?? "",
    city: profile?.city ?? "",
    postCode: profile?.postCode ?? "",
    blocked: profile?.blocked ?? false,
    updated_at: profile?.updated_at ?? null,
    avatar_url: profile?.avatar_url ?? null,
    username: profile?.username ?? null,
  });

  const handleInputChanged = (event: CustomEvent<InputChangeEventDetail>) => {
    const target = event.target as HTMLInputElement;

    console.log(target.id, event.detail.value);

    if (target) {
      const updatedProfile = {
        ...profileInputs,
        [target.id]: event.detail?.value ?? "",
      };

      const hasChanged = hasProfileChanged(profile!, updatedProfile);
      console.log(updatedProfile, profile, hasChanged);
      setProfileRequiresSave(hasChanged);
      setProfileInputs(updatedProfile);
    }
  };

  return (
    <div className="ion-padding">
      {profile && user && (
        <div>
          <IonItem>
            <IonLabel>
              <h1>Address</h1>
            </IonLabel>
          </IonItem>
          <div className="ion-padding-bottom">
            <IonInput
              mode="md"
              id="emailAddress"
              name="emailAddress"
              label="Account email address"
              labelPlacement="floating"
              placeholder="example@email.com"
              type="email"
              readonly
              disabled
              value={user.email}
            />

            <IonInput
              mode="md"
              id="full_name"
              name="full_name"
              label="Full name"
              labelPlacement="floating"
              placeholder="John Doe"
              type="text"
              value={profileInputs?.full_name}
              onIonInput={handleInputChanged}
            />

            <IonInput
              mode="md"
              id="phone_number"
              name="phone_number"
              label="Phone number"
              labelPlacement="floating"
              placeholder="0711234567"
              type="tel"
              value={profileInputs.phone_number}
              onIonInput={handleInputChanged}
            />

            <IonText>
              <h2>Address</h2>
            </IonText>

            <IonInput
              mode="md"
              id="street"
              name="street"
              label="Street"
              labelPlacement="floating"
              placeholder="Street 123"
              type="text"
              value={profileInputs.street}
              onIonInput={handleInputChanged}
            />

            <IonInput
              mode="md"
              id="city"
              name="city"
              label="City"
              labelPlacement="floating"
              placeholder="City"
              type="text"
              value={profileInputs.city}
              onIonInput={handleInputChanged}
            />

            <IonInput
              mode="md"
              id="postCode"
              name="postCode"
              label="Post code"
              labelPlacement="floating"
              placeholder="1234"
              type="tel"
              value={profileInputs.postCode}
              onIonInput={handleInputChanged}
            />
          </div>
        </div>
      )}

      <IonButton expand="block" disabled={!profileRequiresSave}>
        <IonIcon icon={saveOutline} slot="start" />
        Save changes
      </IonButton>
    </div>
  );
};

export default ProfileDetails;
