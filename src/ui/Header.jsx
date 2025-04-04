import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
  return (
    <header>
      <Link to="/">fast pizza</Link>
      <SearchOrder/>
      <p>Vishnu</p>
    </header>
  );
}

export default Header;
