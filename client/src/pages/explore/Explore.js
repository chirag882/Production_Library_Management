import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import BookCard from "../../components/bookCard/BookCard";
import axios from "axios";
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
const Explore = ({ type }) => {
  const [data, setData] = useState([]);

  const getCardData = async () => {
    axios
      .get(`/expore?genre=${type}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getCardData();
  }, [type]);

  const state = useCart();
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
  );
};

export default Explore;
