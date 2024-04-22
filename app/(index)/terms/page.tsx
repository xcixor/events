import TermsAndConditions from "@/components/terms/TermsAndConditions";
import Head from "next/head";

const TermsAndConditionsPage = () => {
  return (
    <>
      <Head>
        <title>Terms and conditions | PES Events</title>
        <meta
          name="description"
          content="Terms and Conditions for PES Events"
        />
      </Head>
      <TermsAndConditions />
    </>
  );
};

export default TermsAndConditionsPage;
