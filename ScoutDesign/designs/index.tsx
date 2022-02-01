import { ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";

import {
  Badge,
  Button,
  CircleButton,
  ImageTileGrid,
  LargeFloatingButton,
  LineItem,
  Text,
  Icon,
  Image,
  Avatar,
  Card,
  Stack,
  TextInput,
  ColorfulTextInput,
} from "../library";

import {
  bonfire,
  checkmark,
  compass,
  gearThin,
  plusBold,
  plusThin,
  searchThin,
  trash,
} from "../icons";
import theme from "../library/theme";
import { useModal } from "../library/Widgets/Modal/useModal";

// There is currently no way to move an image around under the clipping mask. It's centered and that's the only option. If anyone knows how to move the image so I could pass "bottom center" and have the image anchored at the bottom and center that would be great, hmu

const DesignSystem = () => {
  const { modalProps, openModal, Modal } = useModal({
    onNext: () => {},
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.white }}
      contentContainerStyle={{
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 180,
      }}
    >
      <Text accessibilityLabel="ScoutDesign-heading-1" preset="h1">
        Heading 1
      </Text>
      <Text accessibilityLabel="ScoutDesign-heading-2" size="m">
        Heading 2
      </Text>
      <Image
        accessibilityLabel="user-profile"
        placement="background"
        overlay="light"
        size={{
          height: Dimensions.get("window").height * 0.135,
        }}
        source={{
          uri: "https://picsum.photos/1200",
        }}
      />
      <Badge
        accessibilityLabel="campout-solid-badge"
        text="Campout"
        icon={bonfire}
        color="gradient"
      />

      <Text accessibilityLabel="home-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
        diam et sagittis fringilla. Ut volutpat purus id efficitur dictum.
        Mauris metus sem, accumsan a sollicitudin sit amet, rutrum quis libero.
        Aenean ultricies tincidunt auctor. Pellentesque vehicula consectetur
        orci, tincidunt cursus nunc tempor ultricies. Cras pulvinar porta
        sagittis. Mauris semper nunc eget nisi lobortis, eu scelerisque ligula
        lobortis.
      </Text>

      <Text accessibilityLabel="Micro example" preset="micro">
        Micro
      </Text>
      <Button
        accessibilityLabel="solid-submit"
        text="Submit"
        fullWidth
        onPress={openModal}
      />

      <Modal
        {...modalProps}
        backgroundColor="brandPrimary"
        valid
        title="This is a title."
      >
        <Text accessibilityLabel="home-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          diam et sagittis fringilla. Ut volutpat purus id efficitur dictum.
          Mauris metus sem, accumsan a sollicitudin sit amet, rutrum quis
          libero. Aenean ultricies tincidunt auctor. Pellentesque vehicula
          consectetur orci, tincidunt cursus nunc tempor ultricies. Cras
          pulvinar porta sagittis. Mauris semper nunc eget nisi lobortis, eu
          scelerisque ligula lobortis.
        </Text>
      </Modal>
      <Button
        accessibilityLabel="gradient-full-width"
        text="Confirm"
        fullWidth
        backgroundColor="gradient"
        onPress={() => {}}
      />
      <Button
        accessibilityLabel="solid-delete"
        text="Delete"
        icon={trash}
        backgroundColor="danger"
        onPress={() => {}}
      />
      <Button
        accessibilityLabel="solid-add-location"
        text="Location"
        icon={plusBold}
        onPress={() => {}}
      />
      <Button
        accessibilityLabel="gradient-add-location"
        text="Location"
        icon={plusBold}
        backgroundColor="gradient"
        onPress={() => {}}
      />

      <CircleButton
        accessibilityLabel="add-icon-circle-button"
        icon={plusThin}
        onPress={() => {}}
      />
      <Image
        accessibilityLabel="image-tile"
        radius="m"
        onPress={() => {}}
        size="xl"
        source={{
          uri: "https://picsum.photos/500",
        }}
        title="Hike"
      />
      <LargeFloatingButton
        accessibilityLabel="add event button"
        text="New Event"
        icon={plusThin}
        onPress={() => {}}
        corner="bottom-left"
        distanceFromCorner="l"
      />
      <CircleButton
        accessibilityLabel="add-icon-circle-button"
        icon={plusThin}
        backgroundColor="brandSecondary"
        animated
        onPress={() => {}}
        corner="bottom-right"
        distanceFromCorner="l"
      />
      <LineItem
        accessibilityLabel="basic-line-item"
        type="static"
        leftComponent={
          <Avatar
            size="m"
            source={{
              uri: "https://picsum.photos/28",
            }}
          />
        }
        rightComponent={
          <Icon icon={gearThin} color="darkGrey" size="l" onPress={() => {}} />
        }
      >
        <LineItem.Heading>Kaleb Davenport</LineItem.Heading>
        <LineItem.Subheading>Troop 319</LineItem.Subheading>
      </LineItem>
      <Stack
        type="Pressable"
        accessibilityLabel="test-stack"
        radius="l"
        borderColor="mediumGrey"
        everyItemProps={{
          onValueChange: (value) => {},
        }}
        items={[
          {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            text: "First and Last Name",
          },
          {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            text: "Email Address",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            text: "Password",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d73",
            text: "Confirm Password",
          },
        ]}
        RenderItem={({ item, onValueChange, ...rest }) => {
          return (
            <TextInput
              placeholder={item.text}
              valid={item?.valid}
              disabled={item?.disabled}
              error={item?.error}
              noStyles
              onValueChange={onValueChange}
              {...rest}
            />
          );
        }}
      />

      <ColorfulTextInput
        placeholder="Kaleb Davenport"
        valid={false}
        // disabled={true}
        error="hi"
        noStyles
        onValueChange={() => {}}
      />
      <LineItem
        accessibilityLabel="basic-line-item"
        type="button"
        onPress={() => {}}
        leftComponent={<Icon icon={searchThin} color="darkGrey" size="l" />}
      >
        <LineItem.Subheading>
          Celeste Slater 606-3727 Ullamcorper. Street Roseville NH 11523 (786)
          713-8616
        </LineItem.Subheading>
      </LineItem>
      <LineItem
        accessibilityLabel="large-static-line"
        type="static"
        backgroundColor="lightMintGrey"
        leftComponent={
          <Icon radius="circle" icon={compass} color="darkGrey" size="m" />
        }
      >
        <LineItem.Heading>Troop 318</LineItem.Heading>
      </LineItem>
      <Card
        accessibilityLabel="solid card"
        title="Friday, June 10th"
        headerLeft={
          <Badge
            onPress={() => {}}
            accessibilityLabel="campout-solid-badge"
            text="Campout"
            icon={bonfire}
            color="brandSecondaryDark"
          />
        }
        onPress={() => {}}
      >
        <Image
          accessibilityLabel="card-picture"
          placement="foreground"
          radius="m"
          padding="micro"
          size={{
            height: 100,
          }}
          source={{
            uri: "https://picsum.photos/1000",
          }}
        />
        <Card.Description
          sameLine
          heading="Tennessee Falls Trip"
          bodyText={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus"
          }
        />
      </Card>
      <Card
        accessibilityLabel="solid card"
        title="June 10th at 8:45 am"
        headerLeft={
          <Avatar
            size="s"
            source={{
              uri: "https://picsum.photos/28",
            }}
          />
        }
        titleAlignment="center"
        dismissComponent={checkmark}
        onDismiss={() => {}}
        borderBelowHeader
      >
        <Card.Description
          heading="Tennessee Falls Trip"
          bodyText={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus"
          }
        />
      </Card>
      <ImageTileGrid
        rows={2}
        padding="xs"
        tiles={[
          {
            id: "1",
            accessibilityLabel: "first-image",
            source: {
              uri: "https://picsum.photos/700",
            },
            onPress: () => {},
            title: "Campout",
          },
          {
            id: "2",
            accessibilityLabel: "second-image",
            source: {
              uri: "https://picsum.photos/700",
            },
            onPress: () => {},
            title: "Hike",
          },
          {
            id: "3",
            accessibilityLabel: "third-image",
            source: {
              uri: "https://picsum.photos/700",
            },
            onPress: () => {},
            title: "Skiing",
          },
          {
            id: "4",
            accessibilityLabel: "fourth-image",
            source: {
              uri: "https://picsum.photos/700",
            },
            onPress: () => {},
            title: "Meeting",
          },
          {
            id: "5",
            accessibilityLabel: "third-image",
            source: {
              uri: "https://picsum.photos/700",
            },
            onPress: () => {},
            title: "Backpacking",
          },
          {
            id: "6",
            accessibilityLabel: "fourth-image",
            source: {
              uri: "https://picsum.photos/700",
            },
            onPress: () => {},
            title: "Ice Climbing",
          },
        ]}
        everyItemProps={{ radius: "xs" }}
      />
    </ScrollView>
  );
};

export default DesignSystem;
