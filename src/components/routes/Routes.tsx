import { Route, Routes } from "react-router-dom";
import { routerType } from "../../types/routes.types";
import pagesData from "./PagesData";

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;