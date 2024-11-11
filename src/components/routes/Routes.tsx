import { Route, Routes } from "react-router-dom";
import { routerType } from "../../types/routes.types";
import pagesData from "./PagesData";
import { CartasProvider } from "../utils/Game/CartasBloqueadas";

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }: routerType) => {
    //Si estamos en el game utilizamos el contexto de las cartas
    const wrappedElement = title === 'Game' ? (
      <CartasProvider>
        {element}
        </CartasProvider>
    ) : (
      element
    );

    return <Route key={title} path={`/${path}`} element={wrappedElement} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;