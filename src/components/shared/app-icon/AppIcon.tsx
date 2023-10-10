import { IonIcon } from "@ionic/react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";
import * as Icons from "ionicons/icons";

type AppIconProps = {
  slot?: string;
  icon: string;
} & IonicReactProps;

export const AppIcon = (props: AppIconProps) => {
  const { icon } = props;
  const ionIcon = Icons[icon as keyof typeof Icons];
  return <IonIcon {...props} icon={ionIcon} />;
};
