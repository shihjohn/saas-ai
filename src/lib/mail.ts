import emailjs from "@emailjs/browser";

export const sendVerificationEmail = async (user: any, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/email-verification?token=${token}`;
  const message = `<p>Click <a href='${confirmLink}'>here</a> to confirm email.</p>`;
  const emailData = {
    user_name: user.name,
    user_email: user.email,
    message: message,
  };
  emailjs.send(
    "service_wyuory6",
    "template_e997iqt",
    emailData,
    process.env.EMAILJS_KEY
  );
};
