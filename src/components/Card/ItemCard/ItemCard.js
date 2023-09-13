import * as React from "react";

import "./ItemCard.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { WishItemsContext } from "../../../Context/WishItemsContext";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);
  const [open, setOpen] = React.useState(false);

  const handleAddToWishList = () => {
    wishItemsContext.addItem(props.item);
  };

  const handleAddToCart = () => {
    cartItemsContext.addItem(props.item, 1);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="product__card__card">
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Item Added to Cart
        </Alert>
      </Snackbar>
      <div className="product__card">
        <div
          className="product__image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <img
              src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[1].filename}`}
              alt="item"
              className="product__img"
            />
          ) : (
            <img
              src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[0].filename}`}
              alt="item"
              className="product__img"
            />
          )}
        </div>
        <hr></hr>
        <div className="product__card__detail">
          <div className="product__name">
            <Link to={`/item/${props.item.category}/${props.item._id}`}>
              {props.item.name}
            </Link>
          </div>
          <div className="product__description">
            <span>{props.item.description}</span>
            <hr></hr>
          </div>

          <div className="product__price">
            <span>₹ {props.item.price}</span>
          </div>
          <div className="product__card__action">
            <IconButton
              onClick={handleAddToWishList}
              sx={{
                borderRadius: "20px",
                width: "40px",
                height:
                  "40px" /* borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
              }}
            >
              <FavoriteBorderIcon
                sx={{ width: "22px", height: "22px", color: "black" }}
              />
            </IconButton>
            <IconButton
              onClick={handleAddToCart}
              sx={{
                borderRadius: "20px",
                width: "40px",
                height:
                  "40px" /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
                "&:active": {
                  backgroundColor: "#567189",
                  borderColor: "red",
                  color: "red",
                },
              }}
            >
              <AddShoppingCartIcon
                sx={{ width: "22px", height: "22px", color: "black" }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
