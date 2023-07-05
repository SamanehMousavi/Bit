import { styled } from "styled-components";

const SignIn = () => {
  return <Signinbutton>Sign In</Signinbutton>;
};
export default SignIn;

const Signinbutton = styled.button`
  display: block;
  margin-right: 2rem;
  opacity: 1;
  color: White;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  &:hover {
    color: yellow;
  }
  &:active {
    scale: 0.9;
  }
`;
