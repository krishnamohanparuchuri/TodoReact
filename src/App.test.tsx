import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header text", () => {
  render(<App />);
  const headerElement = screen.getByText(/Todo App/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders footer element text", () => {
  render(<App />);
  const subheadingElement = screen.getByText(/krishna/i);
  expect(subheadingElement).toBeInTheDocument();
});

test("renders footer text", () => {
  render(<App />);
  const subheadingText = screen.getByText(/example.com/i);
  expect(subheadingText).toBeInTheDocument();
});

test("renders the various default text", () => {
  render(<App />);
  const makeAppText = screen.getByText("Make app");
  const makeappDescriptionText = screen.getByText(
    "Build react app with typescript"
  );
  expect(makeAppText).toBeInTheDocument();
  expect(makeappDescriptionText).toBeInTheDocument();
});

test("renders the list of todos", () => {
  render(<App />);
  const makeAppText = screen.getAllByTestId("todoList");
  expect(makeAppText.length).toBeLessThanOrEqual(6);
});
