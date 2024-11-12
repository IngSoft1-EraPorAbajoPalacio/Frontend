import { BrowserRouter } from "react-router-dom";
import Router from "../routes/Routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Router />
      <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;