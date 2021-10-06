import React, {useState} from 'react'
import styles from '../styles.module.css'

const Search = ({search}) => {
  const [searchValue, setSearchValue] = useState("");

  const searchI = (e) => {
    e.preventDefault();
    search(searchValue);
    // setSearchValue("");
  }

  return (
    <div>
      <form className={styles.search}>
        <input
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <input onClick={searchI} type="submit" value="SEARCH" />
      </form>
    </div>
  )
}

export default Search
