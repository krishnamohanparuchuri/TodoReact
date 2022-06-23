import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import "./UserPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TodoList from "../components/TodoList/TodoList";
import { DeleteTodo, Todo, ToggleComplete, userInfo } from "../types";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchTerm,setSearchTerm] = useState("");
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [description, setDescription] = useState<string>("");
  const [userInformation, setUserInformation] = useState<userInfo>({
    id: "",
    userName: "",
  });

  const handleLogout = (e: any) => {
    e.preventDefault();
    navigate("/");
    localStorage.removeItem("TODO_TOKEN_JWT");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const changeHandler = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
}

  // const updateTodo = async(id:any) =>{

  //   const getTodo = todos?.filter((todo: any) => todo.id === id);
  //   const updatedTodo = getTodo[0];
  //   updatedTodo.done =!updatedTodo.done;
    
  //   console.log(updatedTodo)
  //   const response = await fetch(
  //     `https://todowebapikrishna.azurewebsites.net/api/todos/${id}`,
  //     {
  //       method: "PUT",
  //       body:JSON.stringify(updatedTodo),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log(response)
  //   if (response.status === 204) {
  //     const updatedTodos = todos?.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, done: !todo.done };
  //       }
  //       return todo;
  //     });
  //     setTodos(updatedTodos);
  //   }
  // }

  const toggleComplete: ToggleComplete = async (id: any) => {
    const updatedTodos = todos?.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo: DeleteTodo = async (id: any) => {
    const response = await fetch(
      `https://todowebapikrishna.azurewebsites.net/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      const updatedTodos = todos?.filter((todo: any) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const addNewTodo = async () => {
    const response = await fetch(
      `https://todowebapikrishna.azurewebsites.net/api/todos`,
      {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          userid: userInformation.id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      setTodos([
        ...todos,
        {
          title: data.title,
          description: data.description,
          done: data.done,
          id: data.id,
        },
      ]);
      setTitle("");
      setDescription("");
    }
  };

  const handleAddNewTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || description === "") {
      return;
    }
    await addNewTodo();
  };
  useEffect(() => {
    addNewTodo();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://todowebapikrishna.azurewebsites.net/api/users/${id}`,
        options
      );
      const data = await response.json();
      if (response.status === 200) {
        setUserInformation({
          ...userInformation,
          id: data.id,
          userName: data.userName,
        });

        const newtodos = data.todos.map((t: any) => {
          return {
            title: t.title,
            id: t.id,
            description: t.description,
            done: t.done,
          };
        });
        setTodos(newtodos);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [id]);
  return (
    <>
      <Header />
      <section className="userpage-container">
      <div className="userpage-container__info">
          <h4 className="userpage-container__text">
            <BsPersonCircle className="userpage-container__logo" /> Hi,{" "}
            <strong className="userpage-container__name">
              {userInformation.userName}{" "}
            </strong>
          </h4>
          <button
            className="userpage-container__logout"
            onClick={(e)=>handleLogout(e)}
          >
            <BiLogOut />
          </button>
        </div>
        <form className='userpage-search__form'  role="search">
            <input className="userpage-search__form__input" onChange={e => changeHandler(e)} id="search" type="search" placeholder="Search..." />
        </form>
        <h4 className="Userpage--info">Add a new activity</h4>
        <form onSubmit={(e) => handleAddNewTodo(e)} className="form-container__userpage">
          <label htmlFor="title" id="title">
            Title
          </label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            id="txtTodoItemToAdd"
            placeholder="enter the title..."
            onChange={handleChange}
          />
          <br />
          <label htmlFor="description" id="description">
            Description
          </label>
          <br />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="enter the description..."
            id="txtTodoItemToAdd_Desc"
            onChange={handleChange}
          />
          <br />
          <button
            value="submit"
            id="btnAddTodo"
            className="form-button"
            disabled={!title || !description}
          >
            Add Todo
          </button>
        </form>
      </section>
      <TodoList
       searchTerm={searchTerm}
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
      <Footer />
    </>
  );
};

export default UserPage;
