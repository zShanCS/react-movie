import styled from 'styled-components';

export const Wrapper = styled.button`
display: block;
background-color: var(--darkGrey);
color: var(--white);
width: 25%;
height: 60px;
border-radius: 30px;
border: 0;
font-size: var(--fontBig);
margin: 20px auto;
transition: all 0.3s;
outline: none;
cursor: pointer;

:hover{
  opacity: 0.8s;
}
`;