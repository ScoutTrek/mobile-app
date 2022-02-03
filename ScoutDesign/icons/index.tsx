import {
  FontAwesome5,
  MaterialCommunityIcons,
  Foundation,
  Ionicons,
  EvilIcons,
  Entypo,
  Octicons,
  AntDesign,
} from '@expo/vector-icons';

export type IconPayloadType = {
  name: string;
  library: React.ElementType;
};

export class IconPayload {
  name: string;
  component: React.ElementType;

  constructor(icon: IconPayloadType) {
    this.name = icon.name;
    this.component = (props) => <icon.library {...props} />;
  }

  isValid() {
    return this.name && this.component;
  }
}

export const bonfire = new IconPayload({
  name: 'bonfire',
  library: Ionicons,
});

export const calendar = new IconPayload({
  name: 'calendar',
  library: AntDesign,
});

export const checkmark = new IconPayload({
  name: 'checkmark-sharp',
  library: Ionicons,
});

export const close = new IconPayload({
  name: 'close',
  library: Ionicons,
});

export const compass = new IconPayload({
  name: 'compass-sharp',
  library: Ionicons,
});

export const downCaret = new IconPayload({
  name: 'chevron-thin-down',
  library: Entypo,
});

export const dot = new IconPayload({
  name: 'primitive-dot',
  library: Octicons,
});

export const forwardArrow = new IconPayload({
  name: 'arrow-forward',
  library: Ionicons,
});

export const gearThin = new IconPayload({
  name: 'gear',
  library: EvilIcons,
});

export const home = new IconPayload({
  name: 'home',
  library: AntDesign,
});

export const light = new IconPayload({
  name: 'light-up',
  library: Entypo,
});

export const plusBold = new IconPayload({
  name: 'plus',
  library: Foundation,
});

export const plusThin = new IconPayload({
  name: 'plus',
  library: MaterialCommunityIcons,
});

export const searchThin = new IconPayload({
  name: 'search',
  library: EvilIcons,
});

export const trash = new IconPayload({
  name: 'trash',
  library: Ionicons,
});

export const upCaret = new IconPayload({
  name: 'chevron-thin-up',
  library: Entypo,
});
