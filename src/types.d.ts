import { Guid } from "guid-typescript";

type Todo = {
  title: string;
  description: string;
  done: boolean;
  id: Guid;
  };

type inputTodo = {
  title: string;
  description: string;
};

type RegisterUserInfo = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password:string;
}

type LoginUserInfo = {
  userName: string;
  password : string;
}

type userInfo = {
  id: string;
  userName:string;
}

type ToggleComplete = (id: Guid) => void;

type DeleteTodo = (id: Guid) => void;

type HandleLogout = () => void;
