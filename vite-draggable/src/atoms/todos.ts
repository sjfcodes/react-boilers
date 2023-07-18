import { atom } from "jotai";

export type ToDo = {
  id: number;
  text: string;
  complete: boolean;
};

// state atoms
export const newToDoAtom = atom<string>("");
export const toDosAtom = atom<ToDo[]>([]);

// atoms that trigger updates to other atoms
export const addToDoAtom = atom(null, (get, set) => {
  const updatedToDos = addToDoToList(get(toDosAtom), get(newToDoAtom));
  set(toDosAtom, updatedToDos);
  set(newToDoAtom, "");
});
export const toggleToDoAtom = atom(null, (get, set, id: number) => {
  const updatedToDos = toggleToDoInList(get(toDosAtom), id);
  set(toDosAtom, updatedToDos);
});
export const removeToDoAtom = atom(null, (get, set, id: number) => {
  const updatedList = removeToDoFromList(get(toDosAtom), id);
  set(toDosAtom, updatedList);
});

// business logic
function addToDoToList(todos: ToDo[], text: string) {
  const newToDo: ToDo = {
    id: todos.length,
    text,
    complete: false,
  };
  return [...todos, newToDo];
}

function toggleToDoInList(todos: ToDo[], id: number) {
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, complete: !todo.complete };
    }
    return todo;
  });
}

function removeToDoFromList(todos: ToDo[], id: number) {
  return todos.filter((todo) => todo.id !== id);
}
