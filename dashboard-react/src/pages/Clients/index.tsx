
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/Button";
import { Color } from "../../utils/tailwindCss";
import { useState } from "react";
import { useClients } from "../../hooks/clients";
import { Link } from "react-router-dom";

export const Clients = () => {
  const { clients, setClients, originalClients } = useClients();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

    const searchItem = e.target.value.toLowerCase();

    if (searchItem.length === 0 || searchInput.length < 3) {
      setClients(originalClients);
      return;
    }
    const filteredClients = clients.filter((client) =>
      client.firstname.toLowerCase().includes(searchItem) ||
      client.phone_number.toLowerCase().includes(searchItem)
    );
    setClients(filteredClients);

  }
  const modifiedPhoneNumber = (phoneNumber: string) => {
    const formattedPhoneNumber = phoneNumber.split(":")[1]?.trim();
    return formattedPhoneNumber;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full p-2 h-10 rounded-xl focus:outline-none appearance-none shadow-[inset_0px_1px_3px_rgba(0,0,0,0.25),_inset_0px_-1px_3px_rgba(0,0,0,0.25)]"
          placeholder="Buscar cliente"
          onChange={handleSearch}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
        />
        {searchInput.length > 0 && searchInput.length <= 3 && (
          <p className="text-red-500 text-sm mt-1 absolute">Debes tener al menos 4 caracteres</p>
        )}
      </div>

      <div className="flex flex-col items-center justify-items-center gap-4 w-full px-4 py-6 rounded-md h-[700px] ">
        {clients.map((client) => (
          <div
            className="flex justify-between p-4 border rounded-lg w-full max-h-[200px] "
            key={client.id}
          >
            <ul className="flex flex-col justify-between gap-4 max-w-[800px]">
              <li className="flex gap-2 items-center text-lg">
                <FontAwesomeIcon
                  icon={faUser}
                />
                {client.firstname} {client.lastname}
              </li>
              <Link to={`https://wa.me/${modifiedPhoneNumber(client.phone_number)}`} target="_blank">
                <li className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                  />
                  {client.phone_number ? modifiedPhoneNumber(client.phone_number) : "No hay número"}
                </li>
              </Link>
            </ul>
            <div className="flex gap-4 p-2 items-center">
              <Button
                className="text-xs w-[80px] h-[30px]"
                color={Color.Primary}
              >
                Crear Cita
              </Button>
              <Button
                className=" w-[80px] h-[30px] text-xs"
                color={Color.Error}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))
        }
      </div >
    </div >
  );
};
