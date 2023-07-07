import { Routes, BrowserRouter, Route } from "react-router-dom";
import { styled } from "styled-components";
import HomePage from "./components/HomePage/HomePage";
import CheckList from "./components/Checklist/CheckList";
import Projects from "./components/ProjectManagerTool/Projects";

function App() {
  return (
    <>
      <BrowserRouter>
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checklist" element={<CheckList />} />
            <Route path="/projects" element={<Projects />} />
            <Route />
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
const Main = styled.div``;
const Footer = styled.div``;
