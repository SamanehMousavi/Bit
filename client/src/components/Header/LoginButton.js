import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Signinbutton onClick={() => loginWithRedirect()}>Sign In</Signinbutton>
    )
  );
};
export default LoginButton;

const Signinbutton = styled.button`
  display: block;
  margin-right: 2rem;
  opacity: 1;
  color: blue;
  background-color: transparent;
  border: none;
  font-size: 1.75rem;
  &:hover {
    color: purple;
  }
  &:active {
    scale: 0.9;
  }
`;
