import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children
}) => {
  return (
    <>
      <header
        data-testid="header"
        className="flex py-4 shadow-md z-10 min-w-[250px]"
      >
        <nav className="flex w-full justify-between items-center max-w-[700px] min-w-[250px] m-auto px-5">
          <FontAwesomeIcon icon={faBars} />
          <h2>Angy Gonzaléz</h2>
        </nav>
      </header>
      <main className="flex min-h-[100vh] w-full max-w-[700px] min-w-[250px] m-auto p-5 text-wrap">
        {children}
      </main>
    </>
  );
};
