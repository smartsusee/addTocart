import React from "react";
import axios from "axios";

const Checkout = () => {
  // const [show, setShow] = React.useState(false);
  let [product, setProduct] = React.useState([
    {
      title: "realme",
      price: 500,
      quantity: 1,
      show: false,
      id: 1,
    },
    {
      title: "oppo",
      price: 100,
      quantity: 1,
      show: false,
      id: 2,
    },
    {
      title: "samsung",
      price: 300,
      quantity: 1,
      show: false,
      id: 3,
    },
  ]);
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };
  // createRazorpayOrder

  const makePayment = async (price) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/createRazorpayOrder",
      {
        amount: price, // ₹500
      }
    );

    console.log(price);

    const options = {
      key: "rzp_test_lO9zpzaPOIvkMr",
      amount: data.amount,
      currency: data.currency,
      order_id: data.order_id,
      handler: async function (response) {
        console.log(response); // See what is being returned
        console.log(response.razorpay_signature); // See what is being returned

        const verifyRes = await axios.post(
          "http://localhost:3000/api/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        alert(verifyRes.data.message);
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  React.useEffect(() => {
    loadRazorpay();
  }, []);

  const showFun = (id) => {
    console.log(id);
    product = product.map((item, ind) => {
      return item.id === id ? { ...item, show: true } : item;
    });

    setProduct([...product]);
    console.log(product);
  };

  const hideFun = (id) => {
    product = product.map((item, ind) => {
      return item.id === id ? { ...item, show: false } : item;
    });
    setProduct([...product]);
  };
  return (
    <div>
      <h2>Buy Now</h2>
      {/* <button>Pay ₹500</button> */}

      {product.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <div
            onMouseOver={() => {
              showFun(item.id);
            }}
            onMouseLeave={() => {
              hideFun(item.id);
            }}
            style={{
              backgroundColor: "red",
              width: "70px",
              textAlign: "center",
            }}
          >
            <div>{item.show && <span id="contet">₹{item.price}</span>}</div>
            <button
              onClick={() => {
                makePayment(item.price);
              }}
            >
              buy now{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
