import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Routes, UserContextProvider } from "./utils";
import { HomeLayout, AuthLayout, ProtectLayout } from "./layout";
import { Home, Login, Register, Translate, Generate } from "./pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={Routes.homepage}>
        {/* For home page and other page associated to home */}
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectLayout />}>
            <Route path={Routes.translate} element={<Translate />} />
            <Route path={Routes.generate} element={<Generate />} />
          </Route>
        </Route>
        {/* For authorization */}
        <Route element={<AuthLayout />}>
          <Route path={Routes.login} element={<Login />} />
          <Route path={Routes.register} element={<Register />} />
        </Route>
      </Route>
    )
  );
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
