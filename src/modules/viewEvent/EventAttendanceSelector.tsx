import { Container, Text } from 'ScoutDesign/library';
import { StyleSheet, View, Button, Pressable } from 'react-native';
import { useState } from 'react';
import theme from 'ScoutDesign/library/theme';
import { gql, useMutation, useQuery } from '@apollo/client';


export const ADD_TO_ATTENDEES = gql`
    mutation RSVP($eventID: String, $response: Number) {
        rsvp(eventID: $eventID, response: $response)    
    }
`;
// TODO: adding backend mutation for add attendee 

export const REMOVE_FROM_ATTENDEES = gql`
`;
// TODO: adding backend mutation to remove from attendees 

type EventAttendanceSelectorProps = {
    eventID: number
}




// component for user to select if you are attending an event 
// pass in the event id
const EventAttendanceSelector = ({ eventID }: EventAttendanceSelectorProps) => {
    const [ selected, setSelected ] = useState('');
    const [ rsvp ] = useMutation(ADD_TO_ATTENDEES);

    return (
        // <View >
        //     <Text variant={"s-light"}>Hello</Text>
        // </View>

        // TODO: add different handlers based on button pressed and write backend mutations
        
        <View style={styles.main_container}>
            <Text style={styles.question_text}>Are you going?</Text>
            <View style={styles.buttons_container}>
                <AttendanceButton 
                    text="No" 
                    selected={selected} 
                    setSelected={setSelected}
                    onPress={() => {
                        rsvp({
                            variables:
                                {event_id: eventID, response: 0},
                        })
                    }} />
                <AttendanceButton 
                    text="Maybe" 
                    selected={selected} 
                    setSelected={setSelected}
                    onPress={() => {
                        rsvp({
                            variables:
                                {event_id: eventID, response: 2},
                        })
                    }}/>
                <AttendanceButton 
                    text="Yes" 
                    selected={selected} 
                    setSelected={setSelected}
                    onPress={() => {
                        rsvp({
                            variables:
                                {event_id: eventID, response: 1},
                        })
                    }}/>
            </View>
        </View>
    )
}

type AttendanceButtonProps = {
    text: string,
    selected: string,
    setSelected: (selection: string) => void,
    onPress: () => void,
}

// button used to create one of the three attendance selectors: no, maybe, yes
const AttendanceButton = ({ text, selected, setSelected, onPress }: AttendanceButtonProps) => {

    const buttonHandler = () => {
        setSelected(text);
        onPress();
    }

    return (
        <Pressable 
            style={[styles.attendance_button, 
                    selected === text ? styles.button_pressed : styles.button_unpressed]}
            onPress={() => buttonHandler()}>
            <Text style={[styles.attendance_button_text,
                        selected === text ? styles.button_pressed_text : styles.button_unpressed_text]}>{text}</Text>
        </Pressable>   
    )
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    question_text: {
        fontWeight: "400",
        fontSize: 18,
        marginVertical: 5,
    },
    buttons_container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 5,
        width: "100%",
    },
    attendance_button: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 50, 
        width: "30%",
        borderWidth: 2,
        borderColor: theme.colors.lightMintGrey,

    },
    attendance_button_text: {
        fontWeight: "600",
        fontSize: 14,
        textAlign: "center"
    },
    button_pressed: {
        backgroundColor: theme.colors.brandPrimary,
        color :theme.colors.white,
        borderColor: theme.colors.brandPrimary,
    }, 
    button_unpressed: {
        backgroundColor: theme.colors.white,
        color: theme.colors.brandPrimary
    },
    button_pressed_text: {
        backgroundColor: theme.colors.brandPrimary,
        color :theme.colors.white
    }, 
    button_unpressed_text: {
        backgroundColor: theme.colors.white,
        color: theme.colors.brandPrimary
    },
})

// // component for user to select if they are attending an event
// export const EventAttendanceSelector = ({addAttendee, removeAttendee}: EventAttendanceSelectorProps) => {
//     return (
//         <Container>
//             <Text>Are you going?</Text>
//             <View style={styles.buttons_container}>
//                 <AttendanceButton text="No" onPress={() => {removeAttendee(); console.log("pressed no");}}/>
//                 <AttendanceButton text="Maybe" onPress={() => {console.log("pressed maybe")}}/>
//                 <AttendanceButton text="Yes" onPress={() => {addAttendee(); console.log("pressed yes");}}/>
//             </View>
//         </Container>
//     )
// }

// // GraphQL mutation to add to roster 
// export const ADD_TO_ATTENDEES = gql`
// `;
// // TODO: adding backend mutation for add attendee 

// export const REMOVE_FROM_ATTENDEES = gql`
// `;
// // TODO: adding backend mutation to remove from attendees 

// type AttendanceButtonProps = {
//     text: string,
//     onPress: () => void
// }

// // button used to create one of the three attendance selectors: no, maybe, yes
// const AttendanceButton = ({text, onPress}: AttendanceButtonProps) => {
//     const [pressed, setPressed] = useState(false);
//     return (
//         <Pressable 
//             style={[styles.attendance_button, 
//                     pressed ? styles.button_pressed : styles.button_unpressed]}
//             onPress={() => {setPressed(!pressed); onPress();}}>
//             <Text>{text}</Text>
//         </Pressable>   
//     )
// }

// const styles = StyleSheet.create({
//     buttons_container: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingVertical: 5,
//     },
//     attendance_button: {
//         fontWeight: "700",
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         borderRadius: 10
//     },
//     button_pressed: {
//         backgroundColor: theme.colors.brandPrimary,
//         color :theme.colors.white
//     }, 
//     button_unpressed: {
//         backgroundColor: theme.colors.white,
//         color: theme.colors.brandPrimary
//     },
// })

export default EventAttendanceSelector;