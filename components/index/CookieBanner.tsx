"use client";
import React, { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import Link from "next/link";
import CookieModal from "./CookieModal";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // This checks if the user has made any cookie preferences choices before
    const consentGiven = getCookie("cookieConsent_given");
    setShowConsent(!consentGiven);
  }, []);

  const acceptAllCookies = () => {
    const cookieSettings = {
      necessary: true,
      preferences: true,
      statistic: true,
      marketing: true,
    };
    Object.keys(cookieSettings).forEach((key) => {
      setCookie(`cookieConsent_${key}`, "true", { path: "/" });
    });
    setCookie("cookieConsent_given", "true", { path: "/" });
    setShowConsent(false);
  };
  const rejectAllCookies = () => {
    const cookieSettings = {
      necessary: false,
      preferences: false,
      statistic: false,
      marketing: false,
    };
    Object.keys(cookieSettings).forEach((key) => {
      setCookie(`cookieConsent_${key}`, "false", { path: "/" });
    });
    setCookie("cookieConsent_given", "false", { path: "/" });
    setShowConsent(false);
  };

  const handleModalClose = () => {
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-70">
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-gray-100 px-4 py-8">
        <span className="text-dark mr-16 text-base">
          PES Academy uses cookies to improve user experience. By using our
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
            className="m-2 rounded bg-pes-blue px-8 py-2 text-white hover:bg-green-600"
            onClick={acceptAllCookies}
          >
            Accept all
          </button>
          <button
            className="m-2 rounded bg-pes-blue px-8 py-2 text-white hover:bg-green-600"
            onClick={() => setShowModal(true)}
          >
            Manage cookies
          </button>
          <button
            className="m-2 rounded bg-pes-red px-8 py-2 text-white hover:bg-green-600"
            onClick={rejectAllCookies}
          >
            Reject All
          </button>
        </div>
      </div>
      {showModal && <CookieModal onClose={handleModalClose} />}
    </div>
  );
};

export default CookieConsent;
