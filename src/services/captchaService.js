export async function getCaptchaToken(
  action = "calculate_ondemand_price"
) {

  try {

    if (
      !window.grecaptcha
    ) {

      return null;
    }

    const timestamp =
      new Date().getTime();

    const captchaAction =
      `custom_customer_${action}_${timestamp}`;

    const token =
      await window
        .grecaptcha
        .enterprise
        .execute(

          import.meta.env
            .VITE_RECAPTCHA_SITE_KEY,

          {
            action:
              captchaAction,
          }
        );

    return {
      token,
      timestamp,
    };

  } catch (error) {

    console.error(
      "CAPTCHA ERROR:",
      error
    );

    return null;
  }
}
