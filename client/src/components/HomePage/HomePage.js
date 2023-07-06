import { styled, keyframes } from "styled-components";
import Header from "../Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const HomePage = () => {
  const { user } = useAuth0();
  // useEffect(() => {
  //   fetch("/addUser", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((response) => response.json())
  //     .then((parsed) => {
  //       console.log(parsed);
  //     })
  //     .catch((error) => console.log(error));
  // });

  return (
    <Main>
      <div>
        <Header />
        <HeroSection>
          <TextBox>
            Some text another text lorem ipsum
            <StartButton>Start now</StartButton>
          </TextBox>
          <ImageOne src={"images/sticky-imageone.png"} alt="Sticky notes" />
          <ImageTwo src={"images/kanban-homepage.png"} alt="Kanban board" />
        </HeroSection>
        <GradientBox></GradientBox>
      </div>
    </Main>
  );
};

export default HomePage;
const Main = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  position: relative;
`;

const gradientAnimation = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;
const GradientBox = styled.div`
  background-image: linear-gradient(40deg, #00c4cc, #ff66c4, #ffa53b);
  background-size: 200%;
  animation: ${gradientAnimation} 5s linear infinite;
  transform: skew(1 rad);

  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
`;

const HeroSection = styled.div`
  display: flex;
  flex: 3 1 1;
  margin-top: 5%;
  margin-left: 10%;
  height: 100%;
  align-items: center;
`;
const TextBox = styled.div`
  flex: 2;
  border: 1rem blue;
  color: black;
  font-size: 5rem;
  grid-area: tx;
  opacity: 0.5;
`;
const StartButton = styled.button`
  display: block;
  margin-right: 2rem;
  opacity: 1;
  color: blue;
  padding: 1rem;
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
const ImageOne = styled.img`
  z-index: 1;
  width: 40rem;
  align-self: stretch;
`;

const ImageTwo = styled.img`
  z-index: 1;
  width: 35rem;
  align-self: stretch;
`;
