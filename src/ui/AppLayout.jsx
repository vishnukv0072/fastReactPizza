import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

function AppLayout() {
  const navigation = useNavigation();
  return (
    <div className="layout">
      {navigation.state === "loading" && <Loader/>}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
