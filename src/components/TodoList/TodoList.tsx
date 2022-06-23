import React from "react";
import "./TodoList.css";
import { Todo, DeleteTodo, ToggleComplete } from "../../types";
import TodoCard from "../TodoCard/TodoCard";

interface TodoListProps {
  todos: Array<Todo>;
  deleteTodo: DeleteTodo;
  toggleComplete: ToggleComplete;
  searchTerm: string;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleComplete,
  searchTerm,
}) => {
  return (
    <>
      <section
        className="todolist--section"
        data-testid="todoList"
        id="todoList"
      >
        {todos
          ?.filter((todo) =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((todo: any) => {
            return (
              <TodoCard
                todo={todo}
                key={todo.id}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
              />
            );
          })}
      </section>
    </>
  );
};

export default TodoList;
