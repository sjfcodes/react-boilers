import { useAtom } from "jotai";
import {
  ToDo,
  addToDoAtom,
  newToDoAtom,
  removeToDoAtom,
  toDosAtom,
  toggleToDoAtom,
} from "../atoms/todos";

const ToDoList: React.FC<{ list: ToDo[] }> = ({ list }) => {
  const [, toggleToDo] = useAtom(toggleToDoAtom);
  const [, removeToDo] = useAtom(removeToDoAtom);

  return (
    <ol>
      {list.map((todo) => (
        <li key={todo.id} style={{ textAlign: "left", display: "flex" }}>
          <div key={todo.id} style={{ width: "500px" }}>
            <input
              type="checkbox"
              name="done"
              onChange={() => toggleToDo(todo.id)}
              checked={todo.complete}
              id={`todo-${todo.id}`}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.text}</label>
          </div>
          {todo.complete ? (
            <button
              type="button"
              style={{ paddingBlock: "1px" }}
              onClick={() => removeToDo(todo.id)}
            >
              delete
            </button>
          ) : (
            <></>
          )}
        </li>
      ))}
    </ol>
  );
};

const ToDosDemo = () => {
  const [newToDo, setNewToDo] = useAtom(newToDoAtom);
  const [toDos] = useAtom(toDosAtom);
  const [, addToDo] = useAtom(addToDoAtom);

  const onInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log({ newToDo });
    console.log((e.target as HTMLInputElement).value);
    setNewToDo((e.target as HTMLInputElement).value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addToDo();
  };

  console.log("ToDosDemo");

  return (
    <div>
      <h1>Jotai Todo's demo</h1>
      <form onSubmit={onSubmit}>
        <ToDoList list={toDos} />
        <input type="text" name="todo" value={newToDo} onInput={onInput} />
        <input type="submit" value="add todo" disabled={!newToDo} />
      </form>
    </div>
  );
};

export default ToDosDemo;
