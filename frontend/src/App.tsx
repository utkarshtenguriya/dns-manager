import { FC } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ModalProvider from "./utils/ModalProvider";
import Modal from "./templates/Modal";
import { AppStore } from "./@types";
import { useSelector } from "react-redux";


const App: FC = () => {
  const { toggle } = useSelector((state: AppStore) => state.modal);

  return (
    <>
      <main>
        <header>
          <Navbar />
        </header>
        <section className="h-[100%]">
          <Outlet />
        </section>
        <footer>
        {toggle ? (
        <ModalProvider>
          <Modal />
        </ModalProvider>
      ) : (
        <></>
      )}
        </footer>
      </main>
    </>
  );
};

export default App;
