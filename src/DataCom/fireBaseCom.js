// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  arrayRemove,
  arrayUnion,
  writeBatch,
} from "firebase/firestore";
import * as docFormat from "./documentsFormat.js";
import { AsyncCompress } from "three/examples/jsm/libs/fflate.module.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/* ------------------ Your web app's Firebase configuration ----------------- */
const firebaseConfig = {
  apiKey: "XXXXXXx",
  authDomain: "XXXXXXx",
  projectId: "XXXXXXx",
  storageBucket: "XXXXXXx",
  messagingSenderId: "XXXXXXx",
  appId: "XXXXXXx",
};

/* -------------------------------------------------------------------------- */
/*                             Initialize Firebase                            */
/* -------------------------------------------------------------------------- */
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const provider = new GoogleAuthProvider();
export const auth = getAuth(); // TODO find a way to get rid of export
let docSnap = undefined;
/* -------------------------------------------------------------------------- */
/*                                static values                               */
/* -------------------------------------------------------------------------- */
const TASKS_PATH = "Tasks";
const CREW_PATH = "Crew";
const Task_Instance_PATH = "Task_Instance";
const ACCESSLEVEL1 = 1;
const ACCESSLEVEL2 = 2;
const AccessLevel3 = 3;
export let legitUser = false;
/* -------------------------------------------------------------------------- */
/*                                basic actions                               */
/* -------------------------------------------------------------------------- */
onAuthStateChanged(auth, (user) => {
  user
    ? console.log("you are logged in", user)
    : console.log("you are signed out ");
  user
    ? checkUserIsLegit(user.uid).then((result) => {
        result
          ? //console.log("user is legit") &&
            (legitUser = true)
          : console.log("user is not legit") && (legitUser = false);
      })
    : null;
});

export function checkUserIsLegit(uid) {
  return getDoc(doc(db, CREW_PATH, uid))
    .then((docSnap) => {
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return true;
      } else {
        console.log("No such document!");
        return false;
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      return false;
    });
}

export function Login() {
  auth.currentUser
    ? console.log("you are already logged in")
    : signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(error);
        });
}
export function signOut() {
  auth.signOut();
}

async function checkAction(condition, action) {
  const userID = getMyID();
  if (!userID) {
    // console.error("No valid user ID found, action aborted.");
    return;
  }

  await getSnap(CREW_PATH, getMyID());
  if (condition()) {
    action();
  }
  clearSnap();
}

/* -------------------------------------------------------------------------- */
/*                             basic info getters                             */
/* -------------------------------------------------------------------------- */
export function getMyID() {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  } else {
    // console.error("No user is currently logged in.");
    return null;
  }
}

export async function checkDocumentExists(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document exists:", docSnap.data());
    return true;
  } else {
    console.log("No such document!");
    return false;
  }
}

async function getSnap(collection_path, document) {
  docSnap = await getDoc(doc(db, collection_path, document));
  return docSnap;
}

function clearSnap() {
  docSnap = undefined;
}

/* -------------------------------------------------------------------------- */
/*                                 constrainst                                */
/* -------------------------------------------------------------------------- */
async function checkAccessLevel(requiredAccessLevel) {
  if (!docSnap) {
    console.log("no docSnap");
    return false;
  }
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("you have access level: ", data.AccessLevel);
    console.log("you need access level: ", requiredAccessLevel);
    return data.AccessLevel >= requiredAccessLevel;
  } else console.log("No such document!");
  return false;
}

async function checkMyAccessLevel(requiredAccessLevel) {
  await getSnap(CREW_PATH, getMyID());
  if (docSnap.data().AccessLevel >= requiredAccessLevel) {
    return true;
  } else {
    return false;
  }
}
/* -------------------------------------------------------------------------- */
/*                                   actions                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Getters -------------------------------- */
export async function getData(docPath, docName) {
  // checkMyAccessLevel(ACCESSLEVEL1); // TODO the data base will not allow me to read the AccessLevel if I dont have clearnse access
  try {
    const docSnap = await getDoc(doc(db, docPath, docName));

    if (!docSnap.exists()) {
      console.log("No such document:", docName, " in ", docPath);
      return;
    }

    // console.log("Document data:", docSnap.data().Name);
    return docSnap.data();
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching document:", error);
  }
}

export async function getAllCollectionNames(collectionPath) {
  const taskCollectionRef = collection(db, collectionPath);
  const snapshot = await getDocs(taskCollectionRef);
  const docs = snapshot.docs.map((doc) => {
    return doc.id;
  });
  // console.log(taskNames);
  return docs;
}

export async function getAllDocuments(DocPath) {
  try {
    const collectionRef = collection(db, DocPath);
    const snapshot = await getDocs(collectionRef);
    const documents = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents;
  } catch (error) {
    console.log("Error DocPath : ", DocPath);
    console.error("Error getting documents: ", error);
  }
}

//! not supported by firebase
export async function getField(collectionName, documentID, fieldName) {
  console.error("getField is not supported by firebase");
  return;

  const docRef = doc(db, collectionName, documentID);
  const docSnap = await getDoc(docRef.select(fieldName));

  if (docSnap.exists()) {
    // Retrieve only the specified field
    const fieldValue = docSnap.get(fieldName);
    // console.log(fieldValue);
    return fieldValue;
  } else {
    console.log("No such document!");
    return null;
  }
}

/* --------------------------------- Setters -------------------------------- */
export async function editField(
  collectionName,
  documentID,
  fieldName,
  newValue
) {
  const requiredAccessLevel = ACCESSLEVEL2;
  // Reference to the document you want to update
  const action = async () => {
    const docRef = doc(db, collectionName, documentID);

    // Create an object with the field to update
    const updateObject = {};
    updateObject[fieldName] = newValue;

    try {
      // Update the document with the new value
      await updateDoc(docRef, updateObject);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  checkAction(() => {
    return checkAccessLevel(requiredAccessLevel);
  }, action);
}

export function logData(collection_path, document) {
  const accessLevelNeeded = ACCESSLEVEL1;
  const text = "Document data:";

  const action = async () => {
    const docSnap = await getDoc(doc(db, collection_path, document));
    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    }
    const data = docSnap.data();
    // console.log(text, data);
  };

  checkAction(() => {
    return checkAccessLevel(accessLevelNeeded);
  }, action);
}

export async function addToArray(Path, docID, Value, newItem) {
  // console.log("Path: ", Path, " docID: ", docID, " Value: ", Value, " newItem: ", newItem);

  const docRef = doc(db, Path, docID);
  try {
    await updateDoc(docRef, {
      [Value]: arrayUnion(newItem),
    });
    // console.log("Item added to array!");
  } catch (error) {
    console.error("Error adding item to array: ", error);
  }
}

export async function removeFromArray(Path, docID, Value, oldItem) {
  // console.log(
  //   "Path: ",
  //   Path,
  //   " docID: ",
  //   docID,
  //   " Value: ",
  //   Value,
  //   " oldItem: ",
  //   oldItem
  // );
  const docRef = doc(db, Path, docID);
  try {
    await updateDoc(docRef, {
      [Value]: arrayRemove(oldItem),
    });
    console.log("Item removed from array!");
  } catch (error) {
    console.error("Error removing item from array: ", error);
  }
}

//TODO  generalise later for multiple arrays
export async function AddToDoubleArray(
  Path,
  docID1,
  Value1,
  newItem1,
  Value2,
  newItem2
) {
  console.log(Path1, docID1);
  console.log(Value1, newItem1);
  console.log(Value2, newItem2);

  const docRef = doc(db, Path, docID);
  try {
    await updateDoc(docRef, {
      [Value]: arrayUnion(newItem),
      [Value2]: arrayUnion(newItem2),
    });
    console.log("Item added to array!");
  } catch (error) {
    console.error("Error adding item to array: ", error);
  }
}

export function assignSelfToTask(TaskId) {
  const accessLevelNeeded = ACCESSLEVEL1;
  const action = async () => {
    // console.log("starting action");
    const taskRef = doc(db, TASKS_PATH, "task1");
    const taskDoc = await getDoc(taskRef);

    if (!taskDoc.exists()) {
      console.log("No such document!");
      return;
    }

    const taskData = taskDoc.data();
    // console.log(taskData);

    const AssignedCrew = taskData.AssignedCrew || [];
    const ID = getMyID();

    if (AssignedCrew.includes(ID)) {
      console.log("You are already assigned to this task");
      return;
    }

    if (AssignedCrew.length >= taskData.NumberOfSlots) {
      console.log("No slots left");
      return;
    }

    AssignedCrew.push(ID);
    await setDoc(taskRef, { AssignedCrew }, { merge: true });
  };

  checkAction(() => {
    return checkAccessLevel(accessLevelNeeded);
  }, action);
}

export function AddCrewMember(crewMemberID, crewMemberDoc) {
  const accessLevelNeeded = ACCESSLEVEL2;
  const action = async () => {
    const ID = crewMemberID;
    const newDocRef = doc(db, CREW_PATH, ID);
    await setDoc(newDocRef, crewMemberDoc);
  };

  checkAction(() => {
    return checkAccessLevel(accessLevelNeeded);
  }, action);
}

export function DeleteCrewMember(crewMemberID) {
  const accessLevelNeeded = ACCESSLEVEL2;
  const action = async () => {
    const ID = crewMemberID;
    const docRef = doc(db, CREW_PATH, ID);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
      console.log(`Document with ID ${ID} successfully deleted.`);
    } else {
      console.log(`No document found with ID ${ID}.`);
    }

    await deleteDoc(docRef);
  };
  checkAction(() => {
    return checkAccessLevel(accessLevelNeeded);
  }, action);
}

export async function DeleteTask(taskName) {
  try {
    const docRef = doc(db, TASKS_PATH, taskName);
    await deleteDoc(docRef);
    console.log("Task Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting Task document: ", error);
  }
}

export async function deleteTasks(taskIds) {
  try {
    for (const taskId of taskIds) {
      const docRef = doc(db, TASKS_PATH, taskId);
      const taskInstanceRef = collection(
        db,
        `${TASKS_PATH}/${taskId}/${Task_Instance_PATH}`
      );

      // Get all documents in the "Task_instance" subcollection
      const taskInstanceDocs = await getDocs(taskInstanceRef);
      const batch = writeBatch(db);

      // Batch delete each document in the "Task_instance" subcollection
      taskInstanceDocs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch to delete all documents in "Task_instance"
      await batch.commit();

      // Delete the parent document itself
      await deleteDoc(docRef);
      console.log(
        `Document ${taskId} and its Task_instance subcollection deleted successfully.`
      );
    }
  } catch (error) {
    console.error(
      "Error deleting documents and Task_instance subcollections: ",
      error
    );
  }
}

export async function deleteCrews(crewID) {
  const batch = writeBatch(db);
  try {
    crewID.forEach((crewID) => {
      const docRef = doc(db, CREW_PATH, crewID);
      batch.delete(docRef);
    });

    // Commit the batch
    await batch.commit();
    console.log("Crew Batch delete successful!");
  } catch (error) {
    console.error("Error deleting Crew batch: ", error);
  }
}




export async function AddTask(taskname, mainTaskData, taskInstances) {
  const batch = writeBatch(db);

  // Main
  const mainDocRef = doc(db, TASKS_PATH, taskname);
  const mainDocData = {
    ...mainTaskData,
  };
  batch.set(mainDocRef, mainDocData);

  // Instances
  taskInstances.map((taskInstance) => {
    const taskInstanceSubCollectionRef = collection(
      db,
      `${TASKS_PATH}/${taskname}/Task_Instance`
    );

    const taskInstanceDocRef = doc(taskInstanceSubCollectionRef);

    // const taskInstanceDocRef = doc(
    //   db,
    //   TASKS_PATH + "/" + taskname + "/Task_Instance"
    // );

    const taskInstanceDocData = {
      ...taskInstance,
    };
    batch.set(taskInstanceDocRef, taskInstanceDocData);
  });

  await batch.commit().catch((error) => {
    console.log(error);
  });
}

/* -------------------------------------------------------------------------- */
// ! Not in use
function CopyCrewMember() {
  const action = async () => {
    const docRef = doc(db, "Crew", "TRalT0QzkBoRRKt6VgAo");
    const docSnapshot = await getDoc(docRef);
    const docData = docSnapshot.data();
    const ID = getMyID();
    console.log("IDL : ", ID);
    const newDocRef = doc(db, "Crew", ID);
    console.log("doc ref:", newDocRef);
    console.log("doc data:", docData);
    await setDoc(newDocRef, docData);
  };

  checkAction(() => {
    return checkAccessLevel(ACCESSLEVEL2);
  }, action);
}
