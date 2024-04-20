import Image from "next/image";
import React from "react";
import {
  Contact2,
  Facebook,
  Instagram,
  Linkedin,
  MailPlus,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-primary text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-3 gap-10 md:grid md:grid-cols-2 lg:gap-20">
          <div className="">
            <Logo />
            <p className="my-4 text-xs leading-normal">
              Private Equity Support (PES) is an enterprise support advisory
              consulting firm based in Nairobi, Kenya. Our mission is to
              successfully originate, de-risk, structure, and support Early
              Stage Financing (SME Investment) in Sub-Saharan Africa.
            </p>
          </div>
          <nav className="">
            <p className="mb-3 font-semibold uppercase tracking-wider">
              Contact info
            </p>
            <div className="mb-4">
              <span className="flex gap-2">
                <Contact2 className="h-6 w-6" />
                Address: <br />
              </span>
              5th Floor, Timau Plaza, Argwings Kodhek Road, <br />
              Nairobi, Kenya.
            </div>
            <div className="mb-4">
              <span className="flex gap-2">
                <Phone className="h-6 w-6" />
                Mobile: <br />
              </span>
              <a href="tel:+254 707 151 783">+254 707 151 783</a>
            </div>
            <div className="mb-4">
              <span className="flex gap-2">
                <MailPlus className="h-6 w-6" />
                Email: <br />
              </span>
              <a href="mailto:connect@privateequity-support.com">
                connect@privateequity-support.com
              </a>
            </div>
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between border-t border-gray-100 pt-10 md:flex-row md:items-center">
          <p className="mb-6 text-left text-sm md:mb-0">
            © Copyright {currentYear} Private Equity Support. All Rights
            Reserved.
          </p>
          <div className="flex items-start justify-start space-x-6 md:items-center md:justify-center">
            <a href="https://twitter.com/PrivateEquityAF">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/privateequityea/">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/company/privateequityaf">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.youtube.com/@PrivateEquitySupport/">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/privateequityaf/">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
