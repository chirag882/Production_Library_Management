import React from "react";
import { useDispatchCart,useCart } from "../ContextReducer";

import "./style.scss";
const BookCard = ({data}) => {
  let dispatch = useDispatchCart();
  let state = useCart();
  const name = data.title.slice(0, 25);
  const author = data.author;
  const id = data._id;
  const stock = data.stock;
  const handleCart = async () => {
    let book = [];
    for(const item of state){
      if(item.name == name){
        book = item;
        break;
      }
    }
    if(book.length === 0 && stock > 0){
      await dispatch({type:"ADD",id: id, name: name,author: author})
    } 
  }

  

  return (
    <div className="content">

      <div className="posterBlock">
        <div class="container">
          <img className="posterImg" src={require(`../../assets/${data.imageLink}`)} alt="" />
          <div class="t" onClick={handleCart}>
            <h3>Add to Cart</h3>
            
          </div>
        </div>
      </div>
      <div className="textBlock">
        <span className="title">{name}</span>
        <span className="date">Year: {data.year}</span>
        <span className="date">Author: {data.author}</span>
        <br />
        <span className="capacity">Available: {data.stock}/5</span>
      </div>
    </div>
  );
};

export default BookCard;
