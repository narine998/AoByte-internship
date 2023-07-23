import React from "react";

import favicon from "../../assets/logo.png";
import searchIcon from "../../assets/search.png";

import styles from "./Header.module.scss";
import DropDown from "../DropDown/DropDown";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header({
  inputRef,
  handleInputChange,
  handleSearchTypeChange,
  handleLoginClick,
  searchType,
}) {
  return (
    <header className={styles.header}>
      <a className={styles.favicon}>
        <img src={favicon} alt="favicon" />
      </a>
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Search by ${searchType}...`}
          onDragOver={(e) => e.preventDefault()}
          onChange={handleInputChange}
        />
        <img className={styles.search} src={searchIcon} alt="search" />
        <DropDown
          onChange={handleSearchTypeChange}
          option1="title"
          option2="comment"
          role="Search by"
        />
      </div>
      <div className={styles.authContainer}>
        <Button onClick={handleLoginClick} variant="contained" size="large">
          Sign In
        </Button>
        <Link to="/signup">
          <Button variant="contained" size="large">
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
