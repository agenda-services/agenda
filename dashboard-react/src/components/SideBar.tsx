import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./SideBar.module.css"
import {faUser, faCalendar} from "@fortawesome/free-solid-svg-icons"
interface SideBarProps {
    visible: boolean;
    handleToggleSidebar: () => void;
  }
  
  export const SideBar: React.FC<SideBarProps> = ({ visible, handleToggleSidebar }) => {
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evitar la propagación del evento de clic
    }
    return (
      <aside className={visible ? `${styles.menu} ${styles.active}` : styles.menu} onClick={handleToggleSidebar}> 
        <div className={styles.menuContent}onClick={handleContentClick} >
          <ul className="flex flex-col gap-[20px] p-[30px]">
            <li className="flex justify-between items-center bg-[#ffffff] w-[80%] h-[50px]">
              Clientes <FontAwesomeIcon icon={faUser} size="2x" color="green" />
            </li>
            <li className="flex justify-between items-center bg-[#ffffff] w-[80%] h-[50px]">
              Calendario <FontAwesomeIcon icon={faCalendar} size="2x" color="green" />
            </li>
          </ul>
        </div>
      </aside>
    );
  };