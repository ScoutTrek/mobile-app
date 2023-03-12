import { Container, Text } from 'ScoutDesign/library';
import { StyleSheet, View, Button, Pressable } from 'react-native';
import { useState } from 'react';
import theme from 'ScoutDesign/library/theme';
import { gql, useMutation, useQuery } from '@apollo/client';


type EventAttendanceSelectorProps = {
    addAttendee: () => void,
    removeAttendee: () => void,
}

// component for user to select if they are attending an event
export const EventAttendanceSelector = ({addAttendee, removeAttendee}: EventAttendanceSelectorProps) => {
    return (
        <Container>
            <Text>Are you going?</Text>
            <View style={styles.buttons_container}>
                <AttendanceButton text="No" onPress={() => {removeAttendee(); console.log("pressed no");}}/>
                <AttendanceButton text="Maybe" onPress={() => {console.log("pressed maybe")}}/>
                <AttendanceButton text="Yes" onPress={() => {addAttendee(); console.log("pressed yes");}}/>
            </View>
        </Container>
    )
}

// GraphQL mutation to add to roster 
export const ADD_TO_ATTENDEES = gql`
`;
// TODO: adding backend mutation for add attendee 

export const REMOVE_FROM_ATTENDEES = gql`
`;
// TODO: adding backend mutation to remove from attendees 

type AttendanceButtonProps = {
    text: string,
    onPress: () => void
}

// button used to create one of the three attendance selectors: no, maybe, yes
const AttendanceButton = ({text, onPress}: AttendanceButtonProps) => {
    const [pressed, setPressed] = useState(false);
    return (
        <Pressable 
            style={[styles.attendance_button, 
                    pressed ? styles.button_pressed : styles.button_unpressed]}
            onPress={() => {setPressed(!pressed); onPress();}}>
            <Text>{text}</Text>
        </Pressable>   
    )
}

const styles = StyleSheet.create({
    buttons_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
    attendance_button: {
        fontWeight: "700",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    button_pressed: {
        backgroundColor: theme.colors.brandPrimary,
        color :theme.colors.white
    }, 
    button_unpressed: {
        backgroundColor: theme.colors.white,
        color: theme.colors.brandPrimary
    },
})