// @flow
import create from 'zustand';
// import { persist } from 'zustand/middleware';

// type Person = {|
//   name: string,
//   date: Date,
// |};

// type State = {|
//   people: Person[],
//   addPerson: (newPerson: Person) => void,
// |};

const useStore = create((set, get) => ({
  people: [],
  byDate: {},
  addPerson: (newPerson, storedDate) => {
    set({
      people: [...get().people, newPerson],
      byDate: {
        ...get().byDate,
        [storedDate]: [...(get().byDate[storedDate] || []), newPerson],
      },
    });
  },
}));

export { useStore };
