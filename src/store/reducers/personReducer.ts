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
        (person) => person.id !== action.payload.id,
      );
    },
    markPeople: (state, action) => {
      state.people = state.people.map((person) => {
        return action.payload.ids.indexOf(person.id) !== -1
          ? { ...person, marked: true }
          : person;
      });
    },
    savePerson: (state, action) => {
      state.people = state.people.map((person) =>
        action.payload.rowData.id === person.id
          ? action.payload.rowData
          : person,
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
  markPeople,
  savePerson,
  deleteMarkedPeople,
} = personSlice.actions;
export default personSlice.reducer;
