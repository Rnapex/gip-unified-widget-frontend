
const API_URL =
  "https://gip-guest-checkout-api-production.up.railway.app";

export async function createGuestCheckoutSession({

  amount,

  orderType,

  payload,

  guestData,
}) {

  const response =
    await fetch(

      `${API_URL}/api/guest-checkout/create-session`,

      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          amount,

          currency: "cad",

          orderType,

          payload,

          guestData,
        }),
      }
    );

  const data =
    await response.json();

  if (!data.success) {

    throw new Error(
      data.message ||
      "Checkout failed"
    );
  }

  return data.data;
}
