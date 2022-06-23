import { Guid } from "guid-typescript";
import React from "react";
import { DeleteTodo, Todo, ToggleComplete } from "../../types";
import "./TodoCard.css";

interface TodoCardProps {
  todo: Todo;
  deleteTodo: DeleteTodo;
  toggleComplete: ToggleComplete;
  classTodo?: string;
}

const TodoCart: React.FC<TodoCardProps> = ({
  todo,
  deleteTodo,
  toggleComplete,
}) => {
  const removeTodo = (): void => {
    deleteTodo(todo.id);
  };

  const completeTodo = (id: Guid): void => {
    toggleComplete(todo.id);
  };
  return (
    <>
      <section className={todo.done ? "todo--below" : "todo--above"}>
        <article
          className={todo.done ? "todo--completed" : "todo--notcompleted"}
        >
          {todo.done ? (
            <button
              onClick={() => completeTodo(todo.id)}
              className="todo__button todo__button-toggle-completed"
            >
              Revert
            </button>
          ) : (
            <button
              onClick={() => completeTodo(todo.id)}
              className="todo__button todo__button-toggle-uncompleted"
            >
              Mark as done
            </button>
          )}
          <h4>{todo.title}</h4>
          <p>{todo.description}</p>
          <button
            className={
              todo.done
                ? "todo__button todo__button--remove"
                : "todo--remove-btn"
            }
            onClick={removeTodo}
          >
            remove
          </button>
        </article>
      </section>
    </>
  );
};

export default TodoCart;