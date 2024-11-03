import { db } from '../firebase'; // Firebase config dosyanız
import { collection, getDocs } from "firebase/firestore";

export async function fetchWritings() {
  const writingsCollection = collection(db, "writings");
  const writingsSnapshot = await getDocs(writingsCollection);
  const writingsList = writingsSnapshot.docs.map(doc => doc.data());
  return writingsList;
}

export async function fetchBookmarks() {
  const bookmarksCollection = collection(db, "bookmarks");
  const bookmarksSnapshot = await getDocs(bookmarksCollection);
  const bookmarksList = bookmarksSnapshot.docs.map(doc => doc.data());
  return bookmarksList;
}


export async function fetchJourneyItems() {
  const journeyCollection = collection(db, 'journeyItems')
  const journeySnapshot = await getDocs(journeyCollection)
  const journeyData = journeySnapshot.docs.map(doc => doc.data())
  return journeyData
}