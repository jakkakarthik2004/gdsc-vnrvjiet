import React, { useEffect, useState } from "react";

interface UserState {
  email: string;
}

const PaymentGatewayRazorpay: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    email: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const paymentHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const amount = 500.0;
    const currency = "INR";
    const receiptId = "1235823";

    const response = await fetch(`${process.env.REACT_APP_BACK_URL}/sendmail/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await response.json();
    console.log("order", order);

    var option = {
      key: "",
      amount,
      currency,
      name: "GDSC VNRVJIET",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response: any) => {
        const body = { ...response, email: user.email };

        const validateResponse = await fetch(
          `${process.env.REACT_APP_BACK_URL}/sendmail/validate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const jsonResponse = await validateResponse.json();
        console.log("jsonResponse", jsonResponse);
      },
      prefill: {
        name: "Jakka Vignesh",
        email: "jakkavignesh2002@gmail.com",
        contact: "9502844394",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new (window as any).Razorpay(option); // Note: Accessing Razorpay from the window object
    rzp1.on("payment.failed", (res: any) => {
      alert("Payment failed");
    });
    rzp1.open();
  };

  return (
    <>
      <div className="product ml-3 mt-3">
        <h1>Razorpay Payment Gateway</h1>
        <div className="w-72 mt-3 ml-3">
          <div className="relative w-full min-w-[200px] h-10">
            <input
              autoComplete="off"
              value={user.email}
              onChange={handleInputs}
              type="email"
              name="email"
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Email
            </label>
          </div>
        </div>
        {/* <div className=""></div> */}
        <div className="mt-3 ml-3">
          <button
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={paymentHandler}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentGatewayRazorpay;
