import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import BookCard from "../../components/bookCard/BookCard";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

import "./style.scss";
const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getCardData = async () => {
    axios
      .get(`/books?page=${page}`)
      .then((response) => {
        setData((prev) => [...prev, ...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const searchHandler = (event) => {
    navigate(`/search/${query}`);
  };

  useEffect(() => {
    getCardData();
  }, [page]);
  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="coverContent">
      <div className="cover-img">
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="titleContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Thousands of fictions, adventures, comics to discover. Explore
              now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a book...."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={searchHandler}>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
      <div className="maincontent">
        {data?.map((item, index) => {
          return (
            <>
              <BookCard key={index} data={item} />
              {loading && <Spinner />}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
