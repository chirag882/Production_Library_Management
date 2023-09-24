import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import BookCard from "../../components/bookCard/BookCard";
import { useCart, useDispatchCart } from "../../components/ContextReducer";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Modal from "../../Modal";
import Cart from "../../pages/cart/Cart";
import Dropdown from "../../components/dropdown/DropdownButton";
import "./style.scss";
const Search = () => {
  const query = useParams();
  const [data, setData] = useState([]);
  axios
    .get(`/search?query=${query.query}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const state = useCart();
  const user = useSelector((state) => state.user);
  const [cartView, setCartView] = useState(false);
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      {data?.length > 0 ? (
        <>
          <div>
            <header className={`header ${show}`}>
              <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                  <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                  <li className="menuItem">Hey, {user?.user?.name}</li>
                  <li className="menuItem">
                    <Dropdown />
                  </li>
                  <li className="menuItem" onClick={handleLogout}>
                    Log Out
                  </li>
                  <li
                    className="menuItem"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    <ShoppingCartOutlined style={{ fontSize: "150%" }} />
                    <Badge
                      size="small"
                      count={state.length}
                      style={{ fontSize: "85%" }}
                      offset={[-21, -20]}
                    />
                  </li>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                </ul>
              </ContentWrapper>
            </header>
            <div className="coverContent">
              <ContentWrapper>
                <div className="maincontent">
                  {data?.map((item, index) => {
                    return (
                      <>
                        <BookCard key={index} data={item} />
                      </>
                    );
                  })}
                </div>
              </ContentWrapper>
            </div>
          </div>
        </>
      ) : (
        <div className="resultNotFound">Sorry, Results not found!</div>
      )}
    </>
  );
};

export default Search;
