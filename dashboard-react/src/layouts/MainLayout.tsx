import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <>
      <header className="p-4 shadow-md z-10">
        <nav className="flex justify-between items-center max-w-[700px] m-auto">
          <FontAwesomeIcon icon={faBars} />
          <h2>Angy Gonzaléz</h2>
        </nav>
      </header>
      <main className="flex min-h-[100vh] w-full max-w-[700px] m-auto p-5 text-wrap">
        {children}
      </main>
    </>
  );
};
