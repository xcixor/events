import { env } from "../env";
export const getHtmlTemplate = (subject: string, message: string) => {
  `<html>
  <head>
    <title>Private Equity Support</title>
    <style>
      body {
        font-family: Garamond, sans-serif;
        background-color: whitesmoke;
        font-family: 'Google Sans', Garamond;
      }
      div {
        background-color: white;
        padding: 20px;
        border-radius: 20px;
      }
      h1 {
        color: #F97316;
      }
      p {
        color: #333333;
        font-size:1rem;
      }
    </style>
  </head>
  <body>
      <div>
        <h1>${subject}</h1>
        <p>${message}</p>
      </div>
      <p style="margin: 0;"><i>Thank you.</i></p>
      <p>Private Equity Support</p><br>
      <p>Office Mobile: +254 707 151 783</p>
      <p>Office Email: <a href="mailto: ${env.SMTP_AUTH_USER}">${env.SMTP_AUTH_USER}</a></p>
      <address style="font-size: 0.6rem; color: #787878;">
          <p>Physical address: 5th Floor, Timau Plaza, Argwings Kodhek Road; Nairobi, Kenya</p>
          <p>Postal address: P.O. Box 19447-00202 Nairobi, Kenya </p>
          <p>Web: <a href="https://www.privateequity-support.com">https://www.privateequity-support.com</a></p>
      </address>
    <img src="cid:https://storage.googleapis.com/pes_public/logo_officiel.png" style="background-color:white; max-height:40px; height:auto; width:auto; object-fit:contain">
  </body>
  </html>`;
};
