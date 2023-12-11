import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../../redux/reducers/activeScreenReducer";
import { Routes } from "../../constants";
import { getAccessToken } from "../../utils";
import { tokenThunkLogout } from "../../redux/thunk/tokenThunk";
import { View } from "react-native";
import { logoutUser } from '../../network';
import { setIsOpen } from '../../redux/reducers/menuReducer';

export const RequireAuth = ({ children }) => {
  const { isAdmin, isRegularUser, accessToken: token } = useSelector((state) => state.token);
  const dispatch = useDispatch();



  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = await getAccessToken(token);
      const isAuthenticated = isRegularUser || isAdmin || !!accessToken;
      if (!isAuthenticated) {
        logoutUser(accessToken);
        await dispatch(tokenThunkLogout());
        dispatch(setActiveScreen(Routes.ENTRANCE));
        dispatch(setIsOpen(false));
      }
    }
    checkAuthentication();
    return () => { }

  }, [isRegularUser]);

  return (
    <View>
      {children}
    </View>
  );
};