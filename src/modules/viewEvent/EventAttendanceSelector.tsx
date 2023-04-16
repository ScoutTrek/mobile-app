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
    eventData: any,
    refetch: any
}

// component for user to select if you are attending an event 
// pass in the event id
const EventAttendanceSelector = ({ eventData, refetch }: EventAttendanceSelectorProps) => {
    const [ selected, setSelected ] = useState('');
    const [ rsvp ] = useMutation(ADD_TO_ATTENDEES);
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
    }, []);

    function attendanceButton(text: string, response: number) {
        return (
        <AttendanceButton 
            text={text}
            selected={selected} 
            setSelected={setSelected}
            onPress={() => {
                rsvp({
                    variables:
                        {event_id: eventData.event.id, response: response},
                }).then(refetch);
            }} />
        )
    }

    return (
        <View style={styles.main_container}>
            <Text preset="label">Are you going?</Text>
            <View style={styles.buttons_container}>
                {attendanceButton("No", 0)}
                {attendanceButton("Maybe", 2)}
                {attendanceButton("Yes", 1)}
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

export default EventAttendanceSelector;