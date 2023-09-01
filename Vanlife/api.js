import {initializeApp} from "firebase/app"
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAoPqK63WMv6jREMpOQkbFirwjg5h56Zp4",
    authDomain: "vanlife-1cc67.firebaseapp.com",
    projectId: "vanlife-1cc67",
    storageBucket: "vanlife-1cc67.appspot.com",
    messagingSenderId: "849134153391",
    appId: "1:849134153391:web:3c6532f276a775fa66ae5a"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
}

/* 
This 👇 isn't normally something needed to do. Instead, it's better to
set up Firebase security rules so only the currently logged-in user 
could edit their vans.

https://firebase.google.com/docs/rules

I'm just leaving this here for some purposes, as it took
me a while to find the `documentId()` function that allows you
to use a where() filter on a document's ID property. (Since normally
it only looks at the data() properties of the document, meaning you
can't do `where("id", "==", id))`

It also shows how you can chain together multiple `where` filter calls
*/

// export async function getHostVan(id) {
//     const q = query(
//         vansCollectionRef,
//         where(documentId(), "==", id),
//         where("hostId", "==", "123")
//     )
//     const snapshot = await getDocs(q)
//     const vans = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return vans[0]
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}