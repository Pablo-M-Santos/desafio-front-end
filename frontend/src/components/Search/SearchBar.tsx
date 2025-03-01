import React, { useState } from "react";
import "./SearchBar.css";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="pesquisa-container">
      <input
        className="inputPesquisa"
        type="text"
        placeholder="Pesquisar"
        value={query}
        onChange={handleSearch}
      />
      <span className="material-icons pesquisa-icon">search</span>{" "}
    </div>
  );
};

export default SearchBar;
