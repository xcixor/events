import React, { useState } from "react";
import "./cookiemodal.css";
import { setCookie } from "cookies-next"; // Ensure this is correctly imported

const cookiesInfo = {
  necessary: {
    enabled: true,
    description:
      "Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website.",
  },
  preferences: {
    enabled: true,
    description:
      "Preference cookies enable a website to remember information that changes the way the website behaves or looks.",
  },
  marketing: {
    enabled: false,
    description:
      "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
  },
  statistic: {
    enabled: false,
    description:
      "Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.",
  },
};

const CookieModal = ({ onClose }) => {
  const [cookies, setCookies] = useState(cookiesInfo);
  const [selectedCookie, setSelectedCookie] = useState("necessary");

  const toggleCookie = (key, event) => {
    event.stopPropagation(); // Prevents the event from triggering the setSelectedCookie when clicking the toggle
    if (key !== "necessary") {
      // Prevent toggling necessary cookies
      setCookies({
        ...cookies,
        [key]: {
          ...cookies[key],
          enabled: !cookies[key].enabled,
        },
      });
    }
  };

  const savePreferences = () => {
    Object.keys(cookies).forEach((key) => {
      setCookie(`cookieConsent_${key}`, cookies[key].enabled.toString(), {
        path: "/",
      });
    });
    setCookie("cookieConsent_given", "true", { path: "/" }); // Set a general cookie to indicate that preferences have been set
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-5">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-4">
            {Object.keys(cookies).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <button
                  className={`mx-2 rounded px-4 py-2 ${selectedCookie === key ? "bg-pes-blue text-white" : "bg-gray-200"}`}
                  onClick={() => setSelectedCookie(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)} cookies
                </button>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={cookies[key].enabled}
                    onChange={(e) => toggleCookie(key, e)}
                    disabled={key === "necessary"}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
          <div className="ml-4 flex-1">
            <p>{cookies[selectedCookie].description}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          {/* <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onClose}>Close</button> */}
          <button
            className="rounded bg-pes-red px-4 py-2 text-white hover:bg-green-600"
            onClick={savePreferences}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
