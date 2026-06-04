import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AWSAccounts from "./pages/AWSAccounts";
import { Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Findings from "./pages/Findings";
import ScanHistory from "./pages/ScanHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <AWSAccounts />
            </ProtectedRoute>
          }
        />
        <Route
  path="*"
  element={<Navigate to="/login" replace />}
/>

<Route
  path="/findings"
  element={
    <ProtectedRoute>
      <Findings />
    </ProtectedRoute>
  }
/>
<Route
  path="/scans"
  element={
    <ProtectedRoute>
      <ScanHistory />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;