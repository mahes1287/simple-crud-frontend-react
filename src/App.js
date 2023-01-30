import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Translations, {
  translationsDataLoader,
} from "./components/Translations";
import UpdateForm from "./components/UpdateForm";
import { AuthProvider } from "./contexts/AuthContext";
import TranslationView from "./components/TranslationView";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route
          path="/translations"
          element={<Translations />}
          loader={translationsDataLoader}
        />
        <Route path="/translations/:id/" element={<TranslationView />} />
        <Route path="/translations/:id/update/" element={<UpdateForm />} />

        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

const Root = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default App;
