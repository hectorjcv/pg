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
import { GetUserStorage } from "./service/UserService";
import { FormatBM2 } from "./component/table/BM2/FormatBM";
import { FormatBM3 } from "./component/table/BM3/FormatBM";


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [renderApp, setRenderApp] = useState(false);
  const user = GetUserStorage();
  let DefDashboard = null;

  if(user) {
    DefDashboard = user.role == 'ADMIN' ? <DashboardAdmin /> : user.role == 'SECRETARY' ? <DashboardSecretary /> : <DashboardPage />;
  }

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
          {
            user && <>
              { currentPath === '/' && DefDashboard }
              { currentPath === '/direct/dashboard' && <DashboardPage /> }
              { currentPath === '/admin/dashboard' && <DashboardAdmin /> }
              { currentPath === '/secretary/dashboard' && <DashboardSecretary /> }
              { currentPath === '/export/format/1' && <InventaryProvider><FormatBM1 /></InventaryProvider> }
              { currentPath === '/export/format/2' && <InventaryProvider><FormatBM2 /></InventaryProvider> }
              { currentPath === '/export/format/3' && <InventaryProvider><FormatBM3 /></InventaryProvider> }
            </>
          }
          {
            !user && <>
              { currentPath === '/' && <LoginPage /> }
            </>
          }
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default App
