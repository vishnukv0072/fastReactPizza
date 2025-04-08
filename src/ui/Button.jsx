import {Link} from "react-router-dom";

function Button({children, disabled, to}) {
  const className = "inline-blocke rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wid text-stone-800 " +
    "hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 " +
    "focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";
  if (to) return <Link to={to} className={className}>Order pizzas</Link>;
  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;