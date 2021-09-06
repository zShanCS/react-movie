import React from "react";

//styles
import { Wrapper } from "./Button.styles";

export const Button = ({ text, callback, children }) => (
  <Wrapper type='button' onClick={callback}>
    {children}{text}
  </Wrapper>
)