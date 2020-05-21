import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
  width:100%;
  padding:8px;
  border-radius:30px;
  border:none;
  background-color:#050042;
  color:white;
  font-size:20px;
`;

export const ButtonLogin = (props) => {
return <Button {...props}><img className="mr-2" src={`image/Login/${props.children}.png`} alt={props.children} width="25px"/>Sign in with {props.children}</Button>
}
