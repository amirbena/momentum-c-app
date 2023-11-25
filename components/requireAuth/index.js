import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/tokenReducer";
import { setActiveScreen } from "../../redux/reducers/activeScreenReducer";
import { Routes } from "../../constants";

export const RequireAuth = () => {
    const { isAdmin, isRegularUser } = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const storage = async()=>{
        return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    }
  
    const isAuthenticated = isRegularUser || isAdmin || !!storage();
  
    useEffect(() => {
      if (!isAuthenticated) {
        dispatch(logout());
        dispatch(setActiveScreen(Routes.ENTRANCE));
        dispatch(setIsOpen(false));
      }
    }, [isAuthenticated, dispatch]);
  
    return (
       <></>
    );
  };