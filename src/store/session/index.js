import { atom, selector } from "recoil";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDM0SSuMuy3rBI60uutpMLU5L9zXbbIS7g",
  authDomain: "spotify-cf1fe.firebaseapp.com",
  databaseURL: "https://spotify-cf1fe.firebaseio.com",
  projectId: "spotify-cf1fe",
  storageBucket: "spotify-cf1fe.appspot.com",
  messagingSenderId: "172380127352",
  appId: "1:172380127352:web:fff6fcb3704a341049ad8d",
  measurementId: "G-W90XY2WX25"
});

const db = getFirestore(firebaseConfig);
const useCollectionRef = collection(db, "Album");

export const tracksAlbums = selector({
  key: "tracks",
  get: async () => {
    const data = await getDocs(useCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
});

export const nameTrack = atom({
  key: "nameTrack",
  default: ""
});

export const filterTracks = selector({
  key: "tracksBusca",
  get: async ({ get }) => {
    const name = get(nameTrack);
    const q = query(useCollectionRef, where("nome", "==", name));
    const data = await getDocs(q);
    const docs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (docs.length === 0) {
      const data = await getDocs(useCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } else {
      return docs;
    }
  }
});

export const sessionStore = atom({
  key: "sessionStore",
  default: []
});

export const indexTRackA = atom({
  key: "indexTRack",
  default: 0
});

export const playtoggle = atom({
  key: "playtoggle",
  default: false
});


export const onlyAlbum = atom({
  key: "onlyAlbum",
  default: []
});
