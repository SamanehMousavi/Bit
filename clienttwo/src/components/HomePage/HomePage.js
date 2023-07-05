import { styled, keyframes } from "styled-components";
import Header from "../Header/Header";

const HomePage = () => {
  return (
    <Main>
      <GradientBox>
        <Header />
        <HeroSection>
          <TextBox>
            Some text another text lorem ipsum
            <StartButton>Start now</StartButton>
          </TextBox>
          <ImageOne src={"images/sticky-imageone.png"} alt="Sticky notes" />
          <ImageTwo src={"images/kanban-homepage.png"} alt="Kanban board" />
        </HeroSection>
      </GradientBox>
    </Main>
  );
};

export default HomePage;
const Main = styled.div`
  height: 100%;
  width: fit-content;
  margin: 0 auto;
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
  margin: 2rem;
  background-image: linear-gradient(30deg, #00c4cc, #ff66c4, #ffa53b);
  background-size: 200%;
  animation: ${gradientAnimation} 10s linear infinite;
  // transform: skewY(0deg);
  border-radius: 2rem;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    ". img1"
    "tx img2";
  justify-items: center;
  height: 85%;
`;
const TextBox = styled.div`
  border: 1rem blue;
  width: 40rem;
  color: black;
  font-size: 4rem;
  grid-area: tx;
  opacity: 0.5;
  bottom: 30rem;
`;
const StartButton = styled.button`
  display: block;
  margin-right: 2rem;
  opacity: 1;
  color: White;
  padding: 1rem;
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
const ImageOne = styled.img`
  z-index: 1;
  width: 45rem;
  grid-area: img1;
  align-self: end;
  justify-self: start;
`;
const ImageTwo = styled.img`
  z-index: 1;
  width: 35rem;
  grid-area: img2;
`;
