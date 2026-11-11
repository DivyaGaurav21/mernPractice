
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthForm from "./components/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute";
import type { AuthDetails, User } from "./types";
import * as api from "./lib/api";
import Todos from "./components/Todos";

function App() {
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState<User | null>(api.readStoredUser);

  async function handleAuth(
    details: AuthDetails,
    isRegister: boolean
  ) {
    setAuthBusy(true);
    setAuthError("");

    try {
      const response = isRegister
        ? await api.signUp(details)
        : await api.signIn(details);

      localStorage.setItem("todo-token", response.token);
      localStorage.setItem("todo-user", JSON.stringify(response.user));

      setUser(response.user);

    } catch (requestError) {
      setAuthError(api.getErrorMessage(requestError));
    } finally {
      setAuthBusy(false);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/todos" replace />
            ) : (
              <AuthForm
                busy={authBusy}
                error={authError}
                onSubmit={handleAuth}
              />
            )
          }
        />

        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
