import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const VIEW_EVENTS_LIST = "ViewEventsList" as const;
export const EVENT_FORM = "EventForm" as const;

export enum EventStackRoutes {
    viewEventsList = "ViewEventsList",
    eventForm = "EventForm"
}

interface EventStackNavigationParamsList extends ParamListBase {
    [EventStackRoutes.viewEventsList]: {};
    [EventStackRoutes.eventForm]: {};
}

// Navigation Props
export type ViewEventsListNavigationProp = NativeStackNavigationProp<
    EventStackNavigationParamsList,
	EventStackRoutes.viewEventsList
>;

export type EventFormNavigationProp = NativeStackNavigationProp<
    EventStackNavigationParamsList,
	EventStackRoutes.eventForm
>;

// Route Props
export type ViewEventsListRouteProp = RouteProp<
    EventStackNavigationParamsList, 
    EventStackRoutes.viewEventsList
>;

export type EventFormRouteProp = RouteProp<
    EventStackNavigationParamsList, 
    EventStackRoutes.eventForm
>;