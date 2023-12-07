import { useEffect, useState } from "react";
import { LoginPage } from "./pages/default/LoginPage";
import { NAVIGATION_EVENT } from "./constants";
import { AuthProvider } from "./context/AuthContext";
import { DashboardPage } from "./pages/direct/DashboardPage";
import { DashBoardAdmin } from "./pages/admin/DashboardPage";
import { NotificationProvider } from "./context/NotificationContext";


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [renderApp, setRenderApp] = useState(false);

  useEffect(()=> {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener(NAVIGATION_EVENT, onLocationChange);
    window.addEventListener('popstate', onLocationChange);
    setRenderApp(!renderApp);
    return () => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    }

  }, [])

  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          { currentPath === '/direct/dashboard' && <DashboardPage /> }
          { currentPath === '/admin/dashboard' && <DashBoardAdmin /> }
          { currentPath === '/' && <LoginPage /> }
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default App
