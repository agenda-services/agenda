import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Sidebar } from "../components/SideBar";

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children
}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const toggleSidebar = () => { setIsSidebarOpen(!isSidebarOpen); };  

  return (
    <>
      <header className="flex py-4 shadow-md z-10 min-w-[250px]">
        <nav className="flex w-full justify-between items-center max-w-[700px] min-w-[250px] m-auto px-5">
          <button onClick={toggleSidebar}>
          {isSidebarOpen ?  <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />          
          <h2>Angy Gonzaléz</h2>
        </nav>
      </header>
      <main className="flex min-h-[100vh] w-full max-w-[700px] min-w-[250px] m-auto p-5 text-wrap">
        {children}
      </main>
    </>
  );
};
