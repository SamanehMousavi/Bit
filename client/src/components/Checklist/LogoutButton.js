import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated, user } = useAuth0();

  return (
    isAuthenticated && (
      <>
        {user.name}
        <Signinbutton
          onClick={() => {
            window.localStorage.clear();
            logout();
          }}
        >
          Sign Out
        </Signinbutton>{" "}
      </>
    )
  );
};
export default LogoutButton;

const Signinbutton = styled.button`
  display: block;
  margin-left: 20px;
  margin-right: 2rem;
  opacity: 1;
  color: #00c4cc;
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
