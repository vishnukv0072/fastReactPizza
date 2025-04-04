import {useState} from "react";
import {useNavigate} from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmission(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmission}>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
    </form>
  )
}

export default SearchOrder;