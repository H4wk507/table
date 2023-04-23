import { createSlice } from "@reduxjs/toolkit";
import { getRandomPeople } from "../../utils/getRandomPeople";

const initialState = {
  people: getRandomPeople(60),
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.people = [...state.people, action.payload];
    },
    deletePerson: (state, action) => {
      state.people = state.people.filter(
        (person) => person.id !== action.payload.id
      );
    },
    markPerson: (state, action) => {
      state.people = state.people.map((person) =>
        action.payload.id === person.id
          ? { ...person, marked: !person.marked }
          : person
      );
    },
    savePerson: (state, action) => {
      state.people = state.people.map((person) =>
        action.payload.id === person.id ? action.payload.rowData : person
      );
    },
    deleteMarkedPeople: (state) => {
      state.people = state.people.filter((person) => !person.marked);
    },
  },
});

export const {
  addPerson,
  deletePerson,
  markPerson,
  savePerson,
  deleteMarkedPeople,
} = personSlice.actions;
export default personSlice.reducer;
