import defaultCompany from "../public/defaultCompany.png";
import Image from "next/image";

const Job = ({ data }) => {
  const { companyName, jobTitle, shortDesc, companyLogo } = data;
  return (
    <div className="bg-white rounded relative pt-20 pb-10 px-10 flex flex-col gap-3">
      <div className="absolute w-32 h-32 -top-16  bg-white rounded-lg grid place-items-center shadow">
        {companyLogo ? (
          <img
            alt="company logo"
            src={companyLogo}
            layout="fill"
            className="relative object-fill max-w-logo"
          />
        ) : (
          <Image src={defaultCompany} width="80" height="80" />
        )}
      </div>
      <h1>{companyName}</h1>
      <h2 className="text-gray-600">{jobTitle}</h2>
      <p className="">{shortDesc}...</p>
    </div>
  );
};

export default Job;
