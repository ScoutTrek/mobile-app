import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCPR0hBsSR4k_EydDPRBz803CUYjvdTyh0',
  authDomain: 'scouttrek-1541525356275.firebaseapp.com',
  databaseURL: 'https://scouttrek-1541525356275.firebaseio.com',
  projectId: 'scouttrek-1541525356275',
  storageBucket: 'scouttrek-1541525356275.appspot.com',
  messagingSenderId: '37638098931',
  appId: '1:37638098931:web:06622f088531214791cc86',
};

export const createHikeEventDocument = async hikeEvent => {
  const eventRef = firestore.collection(`events`).doc();
  const snapshot = await eventRef.get();

  if (!snapshot.exists) {
    // console.log(hikeEvent)
    try {
      await eventRef.set({
        type: 'hike',
        createdAt: new Date(),
        ...hikeEvent,
      });
    } catch (err) {
      console.log(err, 'error creating hike event');
    }
  }
  return eventRef;
};

export const editHikeEventDocument = async (hikeEvent, id) => {
  const eventRef = firestore.collection(`events`).doc(id);
  const snapshot = await eventRef.get();

  if (!snapshot.exists) {
    // console.log(hikeEvent)
    try {
      await eventRef.update({
        type: 'hike',
        createdAt: new Date(),
        ...hikeEvent,
      });
    } catch (err) {
      console.log(err, 'error creating hike event');
    }
  }
  return eventRef;
};

export const createScoutMeetingEventDocument = async scoutMeeting => {
  const eventRef = firestore.collection(`events`).doc();
  const snapshot = await eventRef.get();

  if (!snapshot.exists) {
    try {
      await eventRef.set({
        type: 'scoutMeeting',
        createdAt: new Date(),
        ...scoutMeeting,
      });
    } catch (err) {
      console.log(err, 'error creating scout meeting.');
    }
  }
  return eventRef;
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
