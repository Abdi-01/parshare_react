import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/admin/style.css";

import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { KeepLoginAction, CheckStorageAction } from "./redux/actions/user";

//Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Navigation from "./components/Navigation";
import VerificationPage from "./pages/VerificationPage";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Products from "./pages/admin/Products";
import Parcels from "./pages/admin/Parcels";
import Stats from "./pages/admin/Stats";
import Transactions from "./pages/user/Transactions";
import Profile from "./pages/Profile";
import ParcelDetails from "./pages/user/ParcelDetails";
import Cart from "./pages/user/Cart";
import TransactionsAdmin from "./pages/admin/Transactions";

function App() {
  //Get global state data
  const authReducer = useSelector((state) => state.authReducer);

  //For redirecting
  const history = useHistory();

  //Get user token
  const userLocalStorage = localStorage.getItem("token_parshare");

  //Dispatch
  const dispatch = useDispatch();

  //Check token
  useEffect(() => {
    if (userLocalStorage) {
      //If token exist, keep user logged in (decode token and save loginData to global state)
      KeepLoginAction(dispatch, userLocalStorage, history);
    } else {
      //If token not exist, set checkStorage in global state to 'true'
      CheckStorageAction(dispatch);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      {authReducer.storageIsChecked ? (
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={Profile} path="/profile" />
          <Route component={VerificationPage} path="/authentication/:token" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={ResetPassword} path="/reset-password/:token" />
          <Route component={ChangePassword} path="/change-password/" />
          <Route component={ParcelDetails} path="/parcel/:id_parcel" />
          <Route component={ParcelDetails} path="/parcel/:id_parcel" />
          <Route component={Products} path="/admin/products" />
          <Route component={Stats} path="/admin/stats" />
          <Route component={Parcels} path="/admin/parcels" />
          <Route component={Cart} path="/user/cart" />
          <Route component={Transactions} path="/user/transactions" />
          <Route component={TransactionsAdmin} path="/admin/transactions" />
        </Switch>
      ) : (
        <div className="spinner-container text-center">
          <div className="spinner-border" role="status">
            <span class="visually-hidden">Loading transactions data...</span>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
