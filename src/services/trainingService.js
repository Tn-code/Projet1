import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/config";

// Collection names
const TRAINING_COLLECTION = 'trainings';
const PLANNING_COLLECTION = 'events';

// ============================================
// TRAINING MANAGEMENT
// ============================================

// Get all trainings
export const getAllTrainings = async () => {
  try {
    const trainingsRef = collection(db, TRAINING_COLLECTION);
    const q = query(trainingsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const trainings = [];
    querySnapshot.forEach((doc) => {
      trainings.push({ id: doc.id, ...doc.data() });
    });
    return { data: trainings, error: null };
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return { data: [], error: error.message };
  }
};

// Get training by ID
export const getTrainingById = async (trainingId) => {
  try {
    const trainingRef = doc(db, TRAINING_COLLECTION, trainingId);
    const docSnap = await getDoc(trainingRef);
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'Training not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Add new training
export const addTraining = async (trainingData) => {
  try {
    const trainingsRef = collection(db, TRAINING_COLLECTION);
    const docRef = await addDoc(trainingsRef, {
      ...trainingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { data: { id: docRef.id, ...trainingData }, error: null };
  } catch (error) {
    console.error('Error adding training:', error);
    return { data: null, error: error.message };
  }
};

// Update training
export const updateTraining = async (trainingId, trainingData) => {
  try {
    const trainingRef = doc(db, TRAINING_COLLECTION, trainingId);
    await updateDoc(trainingRef, {
      ...trainingData,
      updatedAt: serverTimestamp()
    });
    return { data: { id: trainingId, ...trainingData }, error: null };
  } catch (error) {
    console.error('Error updating training:', error);
    return { data: null, error: error.message };
  }
};

// Delete training
export const deleteTraining = async (trainingId) => {
  try {
    const trainingRef = doc(db, TRAINING_COLLECTION, trainingId);
    await deleteDoc(trainingRef);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting training:', error);
    return { success: false, error: error.message };
  }
};

// Get trainings by status
export const getTrainingsByStatus = async (status) => {
  try {
    const trainingsRef = collection(db, TRAINING_COLLECTION);
    const q = query(trainingsRef, where('status', '==', status));
    const querySnapshot = await getDocs(q);
    const trainings = [];
    querySnapshot.forEach((doc) => {
      trainings.push({ id: doc.id, ...doc.data() });
    });
    return { data: trainings, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// ============================================
// PLANNING MODULE (Events)
// ============================================

// Get all events
export const getAllEvents = async () => {
  try {
    const eventsRef = collection(db, PLANNING_COLLECTION);
    const q = query(eventsRef, orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return { data: events, error: null };
  } catch (error) {
    console.error('Error fetching events:', error);
    return { data: [], error: error.message };
  }
};

// Get event by ID
export const getEventById = async (eventId) => {
  try {
    const eventRef = doc(db, PLANNING_COLLECTION, eventId);
    const docSnap = await getDoc(eventRef);
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: 'Event not found' };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Add new event
export const addEvent = async (eventData) => {
  try {
    const eventsRef = collection(db, PLANNING_COLLECTION);
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { data: { id: docRef.id, ...eventData }, error: null };
  } catch (error) {
    console.error('Error adding event:', error);
    return { data: null, error: error.message };
  }
};

// Update event
export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = doc(db, PLANNING_COLLECTION, eventId);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: serverTimestamp()
    });
    return { data: { id: eventId, ...eventData }, error: null };
  } catch (error) {
    console.error('Error updating event:', error);
    return { data: null, error: error.message };
  }
};

// Delete event
export const deleteEvent = async (eventId) => {
  try {
    const eventRef = doc(db, PLANNING_COLLECTION, eventId);
    await deleteDoc(eventRef);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }
};

// Get events by date range
export const getEventsByDateRange = async (startDate, endDate) => {
  try {
    const eventsRef = collection(db, PLANNING_COLLECTION);
    const q = query(
      eventsRef,
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return { data: events, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};
