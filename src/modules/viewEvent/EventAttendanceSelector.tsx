import { Text } from 'ScoutDesign/library';
import { StyleSheet, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import theme from 'ScoutDesign/library/theme';
import { gql, useMutation, useQuery } from '@apollo/client';
import { User } from 'data/types';


export const ADD_TO_ATTENDEES = gql`
    mutation RSVP($event_id: ID!, $response: Float!) {
        rsvp(event_id: $event_id, response: $response)    
    }
`;

export const GET_EVENT_ATTENDANCE_IDS = gql`
    query Query($id: ID!) {
        event(id: $id) {
            roster {
                maybe {
                    id
                }
                no {
                    id
                }
                yes {
                    id
                }
            }
        }
    }
`;

export const GET_CURR_USER_ID = gql`
    query Query {
        currUser {
            id
        }
    }
`;

type EventAttendanceSelectorProps = {
    eventID: string
}

// component for user to select if you are attending an event 
// pass in the event id
const EventAttendanceSelector = ({ eventID }: EventAttendanceSelectorProps) => {
    const [ selected, setSelected ] = useState('');
    const [ rsvp ] = useMutation(ADD_TO_ATTENDEES);
    const { loading: loadingEvent, error: errorEvent, data: eventData } = useQuery(GET_EVENT_ATTENDANCE_IDS, {
        variables: { id: eventID },
    });
    const { loading: loadingUser, error: errorUser, data: currUserData } = useQuery(GET_CURR_USER_ID);

    // checks which attendance the user has selected
    function checkAttendance(): void {
        eventData.event.roster.no.forEach(function (attendee: User) {
            if (attendee.id == currUserData.currUser.id) {
                setSelected("No");
            }
        });
        eventData.event.roster.maybe.forEach(function (attendee: User) {
            if (attendee.id == currUserData.currUser.id) {
                setSelected("Maybe");
            }
        });
        eventData.event.roster.yes.forEach(function (attendee: User) {
            if (attendee.id == currUserData.currUser.id) {
                setSelected("Yes");
            }
        });
    }

    // component did mount to see which the user has selected 
    useEffect(() => {
        if (eventData) {
            checkAttendance();
        }
    }, [loadingEvent])

    return (
        <View style={styles.main_container}>
            <Text preset="label">Are you going?</Text>
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
            <Text preset="button" weight="bold" style={[styles.attendance_button_text,
                        selected === text ? styles.button_pressed_text : styles.button_unpressed_text]}>{text}</Text>
        </Pressable>   
    )
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: 80,
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