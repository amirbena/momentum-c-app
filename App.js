import "intl-pluralrules";
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux';
import i18n from './translation/i18n';
import EntranceScreen from './pages/entrance';
import { ACCESS_TOKEN_KEY, BLUE_MOMENTUM, Routes as RoutesContants } from './constants';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { setActiveScreen } from './redux/reducers/activeScreenReducer';
import Register from './pages/register/register';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getAccessToken } from "./utils";
import Spinner from "react-native-loading-spinner-overlay";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import MainDashboard from "./pages/mainDashboard";
import Videos from "./pages/videos";
import { RequireAuth } from "./components/requireAuth/index";
import NavigationPanel from "./components/navigationPanel";
import PopupMessages from "./components/popupMessages";
import { RealTimePopupUpdates } from "./components/realtimePopupUpdates/realtimePopupUpdates";
import FailurePopup from "./components/failurePopup";
import { setSelectedMobileSelection } from "./redux/reducers/menuReducer";

const RouterBuilder = () => {
  const { isLoading } = useSelector((state) => state.isLoading);
  const { accessToken: token } = useSelector((state) => state.token);
  const { t } = useTranslation();

  const { index } = useSelector(state => state.activeScreen);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getAccessToken(token);
      if (accessToken) {
        dispatch(setActiveScreen(RoutesContants.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection(t('menu.main')))
      } else {
        dispatch(setActiveScreen(RoutesContants.ENTRANCE))
      }
    }
    fetchToken();
    return () => { };
  }, [token]);



  return (
    <>
      {index === RoutesContants.ENTRANCE ? <EntranceScreen /> : <></>}
      {index === RoutesContants.REGISTER ? <Register /> : <></>}
      {index === RoutesContants.LOGIN ? <Login /> : <></>}
      {index === RoutesContants.FORGOT_PASSWORD ? <ForgotPassword /> : <></>}
      {index === RoutesContants.MAIN_DASHBOARD ? <RequireAuth><MainDashboard /></RequireAuth> : <></>}
      {index === RoutesContants.VIDEOS_SECTION ? <RequireAuth><Videos /></RequireAuth> : <></>}
      {
        (index === RoutesContants.VIDEOS_SECTION || index === RoutesContants.MAIN_DASHBOARD) ? <NavigationPanel /> : <></>
      }
      <Spinner
        visible={isLoading}
      />
      <FailurePopup />
      <PopupMessages />
      <RealTimePopupUpdates />
    </>

  )
};
export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RouterBuilder />
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
