import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import {
  Create,
  Home,
  Login,
  Navbar,
  NotFound,
  Register,
  Translations,
  UpdateForm,
  TranslationView,
} from "./components";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route
          forceRefresh={true}
          path="/translations"
          element={<Translations />}
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
