import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Routes, UserContextProvider } from "./utils";
import { HomeLayout, AuthLayout, ProtectLayout } from "./layout";
import { lazy, Suspense } from "react";
import { Home } from "./pages";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Generate = lazy(() => import("./pages/Generate/Generate"));
const Translate = lazy(() => import("./pages/Translate/Translate"));

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
        <Route element={<Suspense fallback={<h2>Loading...</h2>} />}></Route>
      </Route>
    )
  );
  return (
    <UserContextProvider>
      <Suspense fallback={<h2>Loading...</h2>}>
        <RouterProvider router={router} />
      </Suspense>
    </UserContextProvider>
  );
}

export default App;

// rain in the cliffs of nigeria
// a vase from pluto
