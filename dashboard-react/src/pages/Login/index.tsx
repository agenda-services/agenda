import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { authPassword, redirectGoogleAuth } from "../../services/accounts/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../../services/accounts/user";
import { Loader } from "./../../components/Loader";

type FormValues = {
  username: string;
  pass: string;
};

const formSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "string.empty": "El usuario o correo es necesario" }),
  pass: Joi.string()
    .required()
    .messages({ "string.empty": "La contraseña es necesaria" })
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: joiResolver(formSchema)
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAccount()
      .then(() => {
        localStorage.setItem("isLogged", "true");
        navigate("/", { replace: true });
      })
      .catch(() => localStorage.setItem("isLogged", "false"));
  }, [navigate]);

  const errorReq = useRef("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const inputClassName = "flex flex-col gap-2";

  const handleRedirectGoogle = useCallback(async () => {
    if (isLoadingGoogle) return;

    try {
      setIsLoadingGoogle(true);
      errorReq.current = "";

      await redirectGoogleAuth();

      setIsLoadingGoogle(false);
    } catch (error) {
      try {
        errorReq.current = JSON.parse((error as Error).message).message;
      } catch {
        errorReq.current = (error as Error).message;
      }

      setIsLoadingGoogle(false);
    }
  }, [isLoadingGoogle, errorReq, setIsLoadingGoogle]);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      if (isLoadingAuth) return;

      try {
        setIsLoadingAuth(true);
        errorReq.current = "";

        await authPassword(data.username, data.pass);

        localStorage.setItem("isLogged", "true");

        navigate("/", { replace: true });

        setIsLoadingAuth(false);
      } catch (error) {
        try {
          errorReq.current = JSON.parse((error as Error).message).message;
        } catch {
          errorReq.current = (error as Error).message;
        }

        setIsLoadingAuth(false);
      }
    },
    [isLoadingAuth, errorReq, setIsLoadingAuth, navigate]
  );

  return (
    <section
      data-testid="login"
      className="h-screen flex items-center justify-center"
    >
      <div
        className="h-min flex flex-col md:flex-row md:justify-center items-center shadow-primary-400"
        style={{ boxShadow: "-30px -30px 1px #7ed956" }}
      >
        <div className="hidden md:block h-full md:h-[600px] w-[400px] bg-black">
          <img
            src="banner.jpg"
            alt="Banner Agenda"
            className="w-full h-full object-contain"
          />
        </div>
        <form
          className="h-full md:h-[600px] overflow-auto w-full flex flex-col gap-8 items-center justify-between border border-primary-600 bg-white p-8 max-w-[400px] transition-all delay-100 ease-in-out scroll-smooth"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-4xl m-0">
              Agenda{" "}
              <small className="text-xs font-semibold bg-primary-100 py-1 px-2 rounded-lg">
                your clients
              </small>
            </h2>
            <h5 className="text-xl">Ingresar</h5>
            {errorReq.current && (
              <span className="bg-red-200 text-red-500 p-2 rounded-md">
                {errorReq.current}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="username" className={inputClassName}>
              Usuario o correo
              <Input
                formRegister={register("username")}
                error={errors.username?.message}
              />
            </label>
            <label htmlFor="pass" className={inputClassName}>
              Contraseña
              <Input
                type="password"
                formRegister={register("pass")}
                error={errors.pass?.message}
              />
            </label>
            <a className="underline text-blue-300 text-xs" href="">
              Olvidé mi contraseña
            </a>
            <Button
              type="submit"
              className="mx-auto outline outline-2 outline-primary-600 hover:outline-none hover:bg-primary-600 hover:text-white"
              disabled={isLoadingAuth}
            >
              Iniciar sesión {isLoadingAuth && <Loader />}
            </Button>
          </div>
          <Button
            type="button"
            className="hover:outline hover:outline-2 hover:outline-primary-400 hover:bg-transparent hover:text-primary-600 transition bg-primary-600 w-min text-white"
            onClick={handleRedirectGoogle}
            disabled={isLoadingAuth}
          >
            <FontAwesomeIcon icon={faRightToBracket} /> Google{" "}
            {isLoadingGoogle && <Loader />}
          </Button>
          <div className="visible md:hidden h-[150px] w-[150px] rounded-full overflow-hidden bg-black">
            <img
              src="banner.jpg"
              alt="Banner Agenda"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="flex flex-col gap-2 items-center">
            <a className="text-xs text-blue-300" href="">
              Términos y condiciones
            </a>
            <small>Hecho con amor por Agenda Services 💚</small>
          </p>
        </form>
      </div>

      <div className="absolute top-0 bg-black w-full h-[50%] -z-10"></div>
    </section>
  );
};
