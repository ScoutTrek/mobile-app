export type Location = {
  lat: number;
  lng: number;
  address?: string;
};

export type Event = {
  id: string;
  type: EventType;
  title?: string;
  description?: string;
  date?: string;
  day?: string;
  startTime?: string;
  distance?: number;
  uniqueMeetLocation?: boolean;
  meetTime?: string;
  leaveTime?: string;
  pickupTime?: string;
  endTime?: string;
  endDate?: string;
  location?: Location;
  meetLocation?: Location;
  creator: User;
};

export type User = {
  id: string;
  name: string;
};

export type Role =
  | 'SCOUTMASTER'
  | 'ASST_SCOUTMASTER'
  | 'SENIOR_PATROL_LEADER'
  | 'PATROL_LEADER'
  | 'SCOUT'
  | 'PARENT'
  | 'ADULT_VOLUNTEER';

export type EventType =
  | 'AQUATIC_EVENT'
  | 'BACKPACK_TRIP'
  | 'BIKE_RIDE'
  | 'BOARD_OF_REVIEW'
  | 'CAMPOUT'
  | 'CANOE_TRIP'
  | 'COMMITTEE_MEETING'
  | 'EAGLE_PROJECT'
  | 'FISHING_TRIP'
  | 'FLAG_RETIREMENT'
  | 'FUNDRAISER'
  | 'TROOP_MEETING'
  | 'HIKE'
  | 'KAYAK_TRIP'
  | 'MERIT_BADGE_CLASS'
  | 'PARENT_MEETING'
  | 'SCOUTMASTER_CONFERENCE'
  | 'SERVICE_PROJECT'
  | 'SPECIAL_EVENT'
  | 'SUMMER_CAMP'
  | 'SWIM_TEST';
