export async function getCaptchaToken() {

  try {

    if (
      !window.grecaptcha
    ) {
      return null;
    }

    const token =
      await window.grecaptcha
        .enterprise.execute(

          import.meta.env
            .VITE_RECAPTCHA_SITE_KEY,

          {
            action:
              "quote_request",
          }
        );

    return token;

  } catch (error) {

    console.error(
      "CAPTCHA ERROR:",
      error
    );

    return null;
  }
}