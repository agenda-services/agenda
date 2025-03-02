import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { cn } from "../utils/tailwindCss";
import { useEffect, useState } from "react";


interface SideBarProps {
  visible: boolean;
  handleToggleSidebar: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ visible, handleToggleSidebar }) => {

  const [show, setShow] = useState(visible);

  const handleShow = () => {
    setShow(!show)
    const timeout = setTimeout(() => {
      handleToggleSidebar()
      clearTimeout(timeout)
    }, 300)
  };

  useEffect(() => {
    setShow(visible);
  }, [visible]);
  return (
    <aside className={cn("h-full w-full fixed top-0 left-0 z-[100]", !visible ? "hidden" : "")} >
      <div className="h-full w-full opacity-40 bg-[#1a1a1a]" onClick={handleShow}>
        {JSON.stringify(visible)}
        {JSON.stringify(show)}
      </div>
      <div className={cn("w-[60%] h-full bg-white absolute top-0 left-0 shadow-lg   transition-transform duration-300 ease-in-out", show ? "translate-x-0" : "-translate-x-full")}>
        <ul className="flex flex-col gap-[20px] p-[30px]">
          <li className="flex justify-between items-center bg-[#ffffff] w-[80%] h-[50px]">
            Clientes <FontAwesomeIcon icon={faUser} className="w-[25px] h-[25px]" color="green" />
          </li>
          <li className="flex justify-between items-center bg-[#ffffff] w-[80%] h-[50px]">
            Calendario <FontAwesomeIcon icon={faCalendar} className="w-[25px] h-[25px]" color="green" />
          </li>
        </ul>
      </div>
    </aside>
  );
};