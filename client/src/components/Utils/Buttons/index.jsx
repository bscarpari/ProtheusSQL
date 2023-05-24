import React from "react";
import { Button } from "./style";

export const ButtonPrimary = ({ text, action }) => {
  return <Button onClick={action}>{text}</Button>;
};
