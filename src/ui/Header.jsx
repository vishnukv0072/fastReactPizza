import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import UserName from "../features/user/UserName.jsx";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-[.25em]">fast pizza</Link>
      <SearchOrder/>
      <UserName/>
    </header>
  );
}

export default Header;
