import React from'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendar, faX } from '@fortawesome/free-solid-svg-icons'

export const Sidebar: React.FC<{ isOpen: boolean, toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`menu-container ${isOpen ? 'show' : ''}`}>
      <div className={`menu-content ${isOpen ? 'show' : ''}`}>
        <button onClick={toggleSidebar}><FontAwesomeIcon icon={faX} /></button>
        <ul className='sidebar'>
          <Link to={"/"}>
          <li>Clientes
            <FontAwesomeIcon icon={faUser} color='#00631a' size='lg'/>
          </li>
          </Link>
          <Link to={"/"}>
          <li>Calendario
            <FontAwesomeIcon icon={faCalendar} color='#00631a' size='lg' />
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};


