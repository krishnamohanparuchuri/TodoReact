import React from "react";
import './SuccessMessage.css';

interface SuccessMessageProps {
  message:string;
}

const SuccessMessage : React.FC<SuccessMessageProps> = ({message}) => {
  return (
    <div className="success-container">
      <p className="success-container__text">{message}</p>
    </div>
  )
}

export default SuccessMessage;