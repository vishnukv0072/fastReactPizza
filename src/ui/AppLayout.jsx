import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "./Loader.jsx";

function AppLayout() {
  const navigation = useNavigation();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {navigation.state === "loading" && <Loader/>}
      <Header />
      <div className="overflow-y-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
