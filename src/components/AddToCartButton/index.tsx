"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import Checkout from "@/app/(frontend)/(authenticated)/form/purchaseApplication/_components/Checkout";
import { createPaymentIntent } from "@/app/(frontend)/(authenticated)/form/purchaseApplication/_actions/actions";
import Link from "next/link";

const AddToCartButton = ({ product }) => {
  const [cart, setCart] = useState(0);
  const [openCheckout, setOpenCheckout] = useState(false);

  // let cart = 0

  const addToCart = () => {
    setCart(cart + 1);
  };

  // if (matchingProduct) {
  //   return addItemToCart({
  //     product,
  //     quantity: matchingProduct.quantity + 1,
  //   });
  // }

  // if (cart.items.find((items) => items.product.id === product.id) == null) {
  //   return addItemToCart({ product, quantity: Number(1) })
  // } else {
  //   return cart.items.map((item) => {
  //     if (item.product.id === product.id) {
  //       return addItemToCart({ product, quantity: item.quantity + 1 })
  //     } else {
  //       return item
  //     }
  //   })
  // }

  function increaseItemQuantity() {
    setCart(cart + 1);
  }

  function decreaseItemQuantity() {
    setCart(cart - 1);
  }

  const quantity = cart;
  // cart.items.find((item) => item.product.id === product.id)?.quantity || 0;

  console.log("quantity", quantity);

  return (
    <div>
      {/* <Button onClick={addToCart}>Add to cart</Button> */}

      <div className="w-full mx-0 flex justify-center items-center">
        {quantity === 0 ? (
          <div className="flex flex-col gap-2">
            <Button className="mx-auto" onClick={addToCart}>
              + Add to Order
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* <Button
              className="mx-auto w-full"
              onClick={() => redirect("/cart")}
            >
              View Cart
            </Button> */}

            <div className="w-full flex justify-center items-center gap-4">
              <Button onClick={decreaseItemQuantity}>-</Button>
              <h2>{quantity} in order</h2>
              <Button onClick={increaseItemQuantity}>+</Button>
            </div>
            <Button
              onClick={() => setOpenCheckout(true)}
              className="mx-auto w-full"
            >
              <Link
                href={{
                  pathname: "/checkout",
                  query: {
                    ticketId: product,
                    qty: cart,
                  },
                }}
              >
                Checkout
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartButton;
