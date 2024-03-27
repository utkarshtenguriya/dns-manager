import { FC } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App: FC = () => {
  return (
    <>
      <main>
        <header>
          <Navbar />
        </header>
        <section >
          <Outlet />
        </section>
        <footer>
          
        </footer>
      </main>
    </>
  );
};

export default App;
