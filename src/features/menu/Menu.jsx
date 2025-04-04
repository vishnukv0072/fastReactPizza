import {getMenu} from "../../services/apiRestaurant.js";
import {useLoaderData} from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu() {
  const data = useLoaderData();
  return (
    <ul>
      {data.map((pizza, index) => <MenuItem pizza={pizza} key={index}/>)}
    </ul>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
