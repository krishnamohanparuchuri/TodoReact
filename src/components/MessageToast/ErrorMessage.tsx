import React from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-container">
      <p className="error-container__info">Error {message}</p>
    </div>
  );
};

export default ErrorMessage;
