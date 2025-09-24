import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

export async function addEvent(eventData) {
    try {
        const docRef = await addDoc(collection(db, "events"), eventData);
        console.log("Event added with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding event: ", e);
        throw e;
    }
}

export async function getMonthEvents(year, month) {
    try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, 
            where("year", "==", year),
            where("month", "==", month)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (e) {
        console.error("Error getting events: ", e);
        throw e;
    }
}