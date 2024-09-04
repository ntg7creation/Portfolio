import { GeoPoint } from "firebase/firestore";
export function createCrewData(
  AccessLevel = 3,
  Date_of_arrival = new Date(Date.now()),
  Date_of_birth = new Date("June 24, 1991"),
  Description = "",
  DietaryNeeds = "carnivores",
  Gender = "Male",
  Name = "Natai",
  Origin = "Israel",
  PreferredTaskType = ["Cooking"],
  Specialty = "",
  SpokenLanguages = ["English", "Hebrew"],
  StudyField = "Software",
  Symbol = {
    option1: 1,
    option2: 5,
    option3: 2,
  },
  UsualStudyTime = {
    Friday: "YYYY-MM-DD 00:00:01",
    Monday: "YYYY-MM-DD 00:00:01",
    Saturday: "YYYY-MM-DD 00:00:01",
    Sunday: "YYYY-MM-DD 00:00:01",
    Thursday: "YYYY-MM-DD 00:00:01",
    Tuesday: "YYYY-MM-DD 00:00:01",
    Wednesday: "YYYY-MM-DD 00:00:01",
  }
) {
  return {
    AccessLevel,
    Date_of_arrival,
    Date_of_birth,
    Description,
    DietaryNeeds,
    Gender,
    Name,
    Origin,
    PreferredTaskType,
    Specialty,
    SpokenLanguages,
    StudyField,
    Symbol,
    UsualStudyTime,
  };
}

export function createTaskData(
  AccessLevel = 2,
  AssignedCrew = ["TRalT0QzkBoRRKt6VgAo"],
  Description = "go cook",
  EstimatedTimeToComplete = 60,
  NumberOfSlots = 2,
  RepeatableWeek = [false, false, false, false, false, true, false],
  TimeStart = new Date("July 12, 2024 00:00:00 GMT-0700"),
  Type = "Cooking",
  Location = new GeoPoint(49.4972470480214, -123.77559872090089)
) {
  return {
    AccessLevel,
    AssignedCrew,
    Description,
    EstimatedTimeToComplete,
    NumberOfSlots,
    RepeatableWeek,
    TimeStart,
    Type,
    Location,
  };
}
