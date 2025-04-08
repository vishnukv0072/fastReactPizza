import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmission(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmission}>
      <input type="text" value={query} placeholder="Search order#"
             className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 transition-all duration-300
              w-28 sm:w-64 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
             onChange={e => setQuery(e.target.value)}/>
    </form>
  )
}

export default SearchOrder;