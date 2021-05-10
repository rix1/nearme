// @flow
import create from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';

// type State = {|
//   people: Person[],
//   addPerson: (newPerson: Person) => void,
// |};

function removeItem(id, array) {
  const indexToBeRemoved = array.findIndex((p) => p.id === id);
  return [
    ...array.slice(0, indexToBeRemoved),
    ...array.slice(indexToBeRemoved + 1, array.length),
  ];
}

const useStore = create(
  persist(
    (set, get) => ({
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
      removePerson: (personToDelete) => {
        const date = dayjs(personToDelete.date).format('YYYY-MM-DD');
        set({
          people: removeItem(personToDelete.id, get().people),
          byDate: {
            ...get().byDate,
            [date]: removeItem(personToDelete.id, get().byDate[date]),
          },
        });
      },
    }),
    {
      name: 'nearme',
    },
  ),
);

export { useStore };
