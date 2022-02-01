import { ImageSourcePropType } from "react-native";
import Image from "../Image/Image";
import { SizePresets } from "../../../utility";

interface AvatarProps {
  size: SizePresets;
  source: ImageSourcePropType;
}

const Avatar = ({ size, source }: AvatarProps) => {
  return (
    <Image
      accessibilityLabel="avatar"
      radius="circle"
      size={size}
      source={source}
    />
  );
};

export default Avatar;
