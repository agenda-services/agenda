import { useEffect, useState } from "react";
import { getClientsService } from "../../services/clients/getClients";
import { Person } from "../../models/Person";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/Button";
import { Color } from "../../utils/tailwindCss";

export const Clients = () => {
  const [clients, setClients] = useState<Person[]>([]);
  const [originalClients, setOriginalClients] = useState<Person[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await getClientsService();
        setOriginalClients(res);
        setClients(res);
      } catch (error) {
        console.log("error", error);
      }
    };
    getClients();
  }, []);

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

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex">
        <div className="relative w-full">
          <input
            type="search"
            className="w-full p-2  rounded-xl shadow-inner focus:outline-none "
            placeholder="Buscar cliente"
            onChange={handleSearch}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          {searchInput.length > 0 && searchInput.length < 3 && (
            <p className="text-red-500 text-sm">
              Debes tener al menos 3 caracteres</p>
          )}
        </div>

      </div>
      <div className="flex flex-col items-center justify-items-center gap-4 w-full px-4 py-2 rounded-md h-[700px] shadow-xl overflow-y-auto">
        {clients.map((client) => (
          <div
            className="flex flex-col p-4 border rounded-lg w-full max-h-[200px] "
            key={client.id}
          >
            <ul className="flex  justify-between gap-4 max-w-[800px]">
              <li className="flex flex-col justify-between  gap-2">
                <h2 className=" text-gray-700">Nombre: {client.firstname}</h2>
                <p className=" text-gray-700">Telefono: {client.phone_number}</p>
              </li>
              <div className="flex gap-4 p-2">
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
                  Eliminar Cliente
                </Button>
              </div>
            </ul>
          </div>
        ))
        }
      </div >
    </div >
  );
};
