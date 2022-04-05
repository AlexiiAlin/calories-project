import {useContext} from "react";
import {AuthService} from "../services/auth.service";
import {UserContext} from "../contexts/user-context";
import {useHistory} from "react-router-dom";
import {ROUTES_LAYOUT} from "../routes";

function initializeUserContextData() {
  return () => {
    const history = useHistory();
    const [userContext, setUserContext] = useContext(UserContext);
    if (!userContext.user) {
      AuthService.me()
        .then(response => {
          setUserContext({
            ...userContext,
            user: response.data.data
          });
        })
        .catch(_ => {
          if (history.location.pathname !== ROUTES_LAYOUT.AUTH + '/login') {
            history.push(ROUTES_LAYOUT.AUTH + '/login');
          }
        });
    }
  }
}

export default initializeUserContextData();
