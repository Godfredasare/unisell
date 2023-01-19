import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigation from "./App/Navigation/AuthNavigation";
import { useCallback, useEffect, useState } from "react";
import Navigation from "./App/Navigation/Navigation";
import AuthContext from "./App/hooks/Authcontex";
import AuthStorage from "./App/Auth/AuthStorage";
import OfflineNotice from "./App/Components/OfflineNotice";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    try {
      const token = await AuthStorage.getToken();
      // console.log(token)
      if (!token) return;
      setUser(token);
    } catch (error) {}
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await restoreToken();
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <OfflineNotice />
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer onReady={onLayoutRootView}>
          {user ? <Navigation /> : <AuthNavigation />}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
