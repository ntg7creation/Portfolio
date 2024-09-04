import * as FireBase from "./fireBaseCom";
import { GeoPoint, getFirestore } from "firebase/firestore";
import { createTaskData } from "./documentsFormat";
import firebase from "firebase/compat/app";
// import demoCrewMember from "./demoCrewMember.json";

/* ---------------------------------- Paths --------------------------------- */
const TASKS_PATH = "Tasks";
const CREW_PATH = "Crew";
const defaultAccessLevel = 1;
const defaultTaskAccessLevel = 0;
/* ---------------------------------- links --------------------------------- */
const db = getFirestore();
/* ----------------------------- Captin Actions ----------------------------- */

export function deleteCrewMember(id) {
  FireBase.DeleteCrewMember("tempID");
}

function getNextDayOfWeek(day) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const targetDayIndex = daysOfWeek.indexOf(day);

  if (targetDayIndex === -1) {
    throw new Error("Invalid day of the week");
  }

  const daysUntilNext = (targetDayIndex + 7 - today.getDay()) % 7 || 7;

  const nextDate = new Date(today.setDate(today.getDate() + daysUntilNext));
  nextDate.setHours(13, 0, 0, 0); // TODO tempTime

  return nextDate;
}

export async function addCrewMember(crewName, crewEmail) {
  //authentacte new email
  //add Crew Member document
}
export async function addTask(
  taskname,
  color,
  etc,
  taskType,
  numberofslots,
  selectedDays
) {
  const exists = await FireBase.checkDocumentExists("Tasks", taskname);

  if (exists) {
    return false;
  }

  const mainTaskData = {
    Color: color,
    Description: "not implemented yet",
    EstimatedTimeToComplete: etc,
    NumberOfSlots: numberofslots,
    requiredAccessLevel: defaultTaskAccessLevel, // default access level
    Type: taskType,
  };
  const taskInstances = [];

  selectedDays.map((day) => {
    taskInstances.push({
      AssignedCrew: [],
      Date: getNextDayOfWeek(day),
    });
  });

  FireBase.AddTask(taskname, mainTaskData, taskInstances);

  return true;
}

export function editTask(taskname) {
  FireBase.editField("Tasks", "taskname", "NumberOfSlots", 5);
}

export async function deleteTask(TaskId) {
  FireBase.DeleteTask(TaskId);
  //! return if deleted
  return true;
}

export async function deleteTasks(taskIds) {
  const success = await FireBase.deleteTasks(taskIds);

  //! return if deleted
  return true;
}

export async function deleteCrews(crewID) {
  const success = await FireBase.deleteCrews(crewID);

  //! return if deleted
  return true;
}

// export async function deleteTask(taskName) {}

/* ------------------------------ Basic Actions ----------------------------- */

export function getAuthenticated() {
  FireBase.Login();
}

export function signOut() {
  FireBase.signOut();
}

/* -------------------------------------------------------------------------- */
/*                                Crew Actions                                */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Getters -------------------------------- */

/**
 * fetches the crew name from the given userID
 * @param {string} userID the id of the user
 * @returns {Promise<string>} the crew name
 */
export async function getCrewName(userID) {
  // console.log("fetching crew name from: " + userID);

  const CrewData = await FireBase.getData(CREW_PATH, userID);
  if (!CrewData) return "tempCrewName";
  const crewName = CrewData.Name;
  // console.log("got crew name: " + crewName);
  return crewName;
}

/**
 * fetches the crew names from the given array of userIDs
 * @param {string[]} crewIDs the array of userIDs
 * @returns {Promise<string[]>} the array of crew names
 */
export async function fetchCrewNames(crewIDs) {
  const crewNamesPromises = crewIDs.map(async (nameID) => {
    return getCrewName(nameID);
  });

  const crewNames = await Promise.all(crewNamesPromises);

  return crewNames;
}

export async function fetchAllCrewNames() {
  const Crew = await FireBase.getAllDocuments(CREW_PATH);
  return Crew;
}

/**
 * gets the task data from the given task name
 * @param {string} taskName the task name
 * @returns {Promise<object>} the task data
 */
export async function getTaskData(taskName) {
  return FireBase.getData(TASKS_PATH, taskName);
}

/**
 * gets the task instance data from the given task name and instance id
 * @param {string} taskName the task name
 * @param {string} instanceID the instance id
 * @returns {Promise<object>} the task instance data with the assigned crew names
 */
export async function getTaskInstance(taskName, instanceID) {
  const id = await FireBase.getData(
    TASKS_PATH + "/" + taskName + "/" + "Task_Instance",
    instanceID
  );
  id.assignedCrewName = await fetchCrewNames(id.AssignedCrew);
  return id;
}

/**
 * gets all the task instances from the given task name
 * @param {string} taskName the task name
 * @returns {Promise<string[]>} the array of task instance ids
 */
export async function getTaskInstances(taskName) {
  return FireBase.getAllCollectionNames(TASKS_PATH + "/" + taskName);
}

/**
 * gets all the task names
 * @returns {Promise<string[]>} the array of task names
 */
export async function getTasksNames() {
  return FireBase.getAllCollectionNames(TASKS_PATH);
}

export async function getTasks() {
  return FireBase.getAllDocuments(TASKS_PATH);
}

/**
 * gets all the task instances
 * @returns {Promise<object[]>} the array of task instances with the assigned crew names
 */
export async function getAllTaskInstances() {
  const tasks = await await FireBase.getAllDocuments(TASKS_PATH);


  const allTaskInstances = await Promise.all(
    tasks.map(async (task) => {
      const taskInstances = await FireBase.getAllDocuments(
        TASKS_PATH + "/" + task.id + "/" + "Task_Instance"
      );

      return taskInstances.map((taskInstance) => {
        return {
          ...task,
          ...taskInstance,
          id: taskInstance.id, // can be removed
          name: task.id,
          day: new Date(taskInstance.Date.seconds * 1000).toLocaleString(
            "en-US",
            { weekday: "long" }
          ),
        };
      });
    })
  );

  return [].concat(...allTaskInstances);
}

//! not in use
// async function getSelfNameID() {
//   return {
//     name: "tempNamefromcode",
//     id: "tempIDfromcode",
//   };
// }
/* --------------------------------- Setters -------------------------------- */

/**
 * assigns the current user to the given task instance
 * @param {string} taskName the task name
 * @param {string} instanceID the instance id
 */
export async function assignToTask(taskName, instanceID) {
  //TODO handle error when permision denied
  console.log("assignToTask");
  const Path = TASKS_PATH + "/" + taskName + "/" + "Task_Instance";
  const myID = FireBase.getMyID();
  FireBase.addToArray(Path, instanceID, "AssignedCrew", myID);
  // FireBase.addToArray(Path, instanceID, "AssignedCrewName", self.name);
}

/**
 * assigns a crew member to the given task instance
 * @param {string} taskName the task name
 * @param {string} instanceID the instance id
 * @param {string} crewID the crew member id
 * @param {string} crewName the crew member name
 */
export async function unassignFromTask(taskName, instanceID, crewID, crewName) {
  //is Captain?
  //TODO handle error when permision denied
  console.log("unAssignFromTask");
  const Path = TASKS_PATH + "/" + taskName + "/" + "Task_Instance";
  const myID = FireBase.getMyID();
  FireBase.removeFromArray(Path, instanceID, "AssignedCrew", myID);
}




export function editSelf() {
  //TODO
}





/* ----------------------------------- dev ---------------------------------- */
//! not in use
// export function logData() {
//   FireBase.logData(CREW_PATH, "ZFJNKht1sXWmyhGsH9z1fO3MyZz1");
// }

//! not in use
// export function checkAccessLevel() {}

//! not in use
// export function tempButton() {
//   // deleteCrewMember();
//   // addCrewMember();
//   // addTask("testTask2");
//   // deleteTask();
//   editTask();
// }
