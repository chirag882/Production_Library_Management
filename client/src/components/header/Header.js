import React, { useState, useEffect } from "react";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart, useDispatchCart } from "../../components/ContextReducer";
import logo from "../../assets/logo.png";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import "./style.scss";
import Modal from "../../Modal";
import Cart from "../../pages/cart/Cart";
import Dropdown from "../dropdown/DropdownButton";
const Header = () => {
  const data = useCart();
  const user = useSelector((state) => state.user);
  const [cartView, setCartView] = useState(false);
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
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

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className={`header ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
        <li className="menuItem">
            Hey, {user?.user?.name}
          </li>
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
              count={data.length}
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
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a book...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
