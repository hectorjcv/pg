import { useEffect, useState } from "react";
import { LoginPage } from "./pages/default/LoginPage";
import { NAVIGATION_EVENT } from "./constants";
import { AuthProvider } from "./context/AuthContext";
import { DashboardPage } from "./pages/direct/DashboardPage";
import { NotificationProvider } from "./context/NotificationContext";
import { DashboardSecretary } from "./pages/secretary/DashboardPage";
import { DashboardAdmin } from "./pages/admin/DashboardPage";
import { InventaryProvider } from "./context/InventaryContext";
import { FormatBM1 } from "./component/table/BM1/FormatBM1";


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
          { currentPath === '/admin/dashboard' && <DashboardAdmin /> }
          { currentPath === '/secretary/dashboard' && <DashboardSecretary /> }
          { currentPath === '/excel/1' && <InventaryProvider><FormatBM1 /></InventaryProvider> }
          { currentPath === '/' && <LoginPage /> }
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default App
