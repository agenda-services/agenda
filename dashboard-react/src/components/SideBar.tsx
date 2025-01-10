import React from'react'
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendar, faX } from '@fortawesome/free-solid-svg-icons'

export const Sidebar: React.FC<{ isOpen: boolean, toggleSidebar: () => void }> = ({isOpen}) => {
  if (!isOpen) return null;
      return (
      <div className='menu-container'>
      <div className='menu-content'>
      <button><FontAwesomeIcon icon ={faX}/></button>
        <ul className='sidebar'>
          <li>Clientes
            <FontAwesomeIcon icon={faUser}/>
          </li>
          <li>Calendario
            <FontAwesomeIcon icon={faCalendar}/>
          </li>
        </ul>
      </div>
    </div>
    )
  }

