"use client";
import React from "react";
import { hasCookie, setCookie } from "cookies-next";
import Link from "next/link";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = React.useState(false);

  React.useEffect(() => {
    // Check if the cookie consent is already given (for any type)
    setShowConsent(!hasCookie("localConsent"));
  }, []);

  const acceptAllCookies = () => {
    // Set a cookie to indicate all cookies are accepted
    setCookie("localConsent", "all", { path: "/" });
    setShowConsent(false);
  };

  const acceptNecessaryCookies = () => {
    // Set a cookie to indicate only necessary cookies are accepted
    setCookie("localConsent", "necessary", { path: "/" });
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-70">
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-gray-100 px-4 py-8">
        <span className="text-dark mr-16 text-base">
          PES uses cookies to improve user experience. By using our
          website, you consent to all cookies in accordance with our
          <Link
            href="/privacy"
            className="font-semibold text-pes-blue hover:text-pes-red"
          >
            &nbsp;Cookie Policy.
          </Link>
        </span>
        <div>
          <button
            className="mr-4 rounded bg-pes-blue px-8 py-2 text-white hover:bg-green-600"
            onClick={acceptAllCookies}
          >
            Accept all
          </button>
          <button
            className="rounded bg-pes-red px-8 py-2 text-white hover:bg-green-600"
            onClick={acceptNecessaryCookies}
          >
            Accept necessary cookies only
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
