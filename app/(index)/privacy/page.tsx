import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";
import Head from "next/head";

const PrivacyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | PES Events</title>
        <meta name="description" content="Privacy Policy for PES Events" />
      </Head>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPage;
