import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Job from "../components/Job";
import useJobFilterStore from "../store/jobsFilterStore";
import Image from "next/image";

export default function Home({ allJobsData }) {
  const [jobsData, setJobsData] = useState([]);
  const companyFilter = useJobFilterStore((state) => state.company);
  const recentFilter = useJobFilterStore((state) => state.recent);
  const isFilterShowing = useJobFilterStore((state) => state.isFilterShowing);
  const setIsFilterShowing = useJobFilterStore(
    (state) => state.setIsFilterShowing
  );

  //We will listen to changes in filters and update the showing jobs concurrently
  useEffect(() => {
    //first copy all of the data and manipulate it along the way
    let filteredData = [...allJobsData];

    //if no such company name is used as a filter, don't need to manpulate the jobs jobsData
    //else filter it with companies that have names that even partially match the filteredData
    //using regex we can search for partial matches
    if (recentFilter !== "") {
      filteredData = filteredData.filter(({ companyName }) => {
        //pass i as second argument to indicate it is a case insensitive matching
        const regex = new RegExp(companyFilter, "i");
        return regex.test(companyName);
      });
    }
    //check if we want to get only recent jobs (jobs that are posted less than 7 days)
    if (recentFilter) {
      filteredData.filter((data) => {
        const { postedDate } = data;
        //some jobs are posted hours ago, some are days ago, so we can match for either d or h
        //sample posted date: 3d ago, 14h ago
        const dayRegex = /(\d+)([dh])/g;
        const match = postedDate.match(dayRegex);

        //if we find that the format is on days, we can check if the value is less than 700
        if (match[1] === "d") {
          const day = match[0];
          return Number(day) <= 7;
        }
        //else means it's on hours, we dont care and just allways return true since max hours is 24 which is just 1 day
        else {
          return true;
        }
      });
    }

    //finally return only the first 10 jobs after filtering it
    setJobsData(filteredData.slice(0, 10));
  }, [companyFilter, recentFilter]);

  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Head>
        <title>Zippia jobs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Dashboard />
        <div className="mx-auto lg:px-4 container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-28 mt-48 md:mt-44">
          {jobsData.map((jobData, i) => (
            <Job key={i} data={jobData}></Job>
          ))}
        </div>
        <button
          onClick={() => setIsFilterShowing(!isFilterShowing)}
          className="sm:hidden grid place-content-center fixed bottom-2 right-2 p-2 bg-gray-200 rounded-full"
        >
          <Image src="/filterIcon.png" width="48" height="48" />
        </button>
      </main>
      <footer className="bg-gray-700 py-7 text-white mt-10 flex justify-evenly items-center">
        <div className="flex flex-col items-center gap-2 justify-center">
          <p>Website by Francis James Dela Cruz</p>
          <a
            href="https://github.com/francizjamez"
            target="_blank"
            rel="norefferer"
          >
            <div className="bg-white rounded-full grid place-items-center">
              <Image src="/githubIcon.png" height="24" width="24" />
            </div>
          </a>
        </div>
        <div className="flex flex-col gap-2 items-center justify-items-stretch">
          <p>For Zippia co.</p>
          <p>As a website test/project from Upwork</p>
        </div>
      </footer>
    </div>
  );
}

//Before sending the page from the server, we will get the data from the server and pass it as props on the home component
export async function getStaticProps(context) {
  const requestPayload = {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    locations: [],
    numJobs: 20,
    previousListingHashes: [],
  };
  const res = await axios.post(
    "https://www.zippia.com/api/jobs/",
    requestPayload
  );

  if (!res.data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { allJobsData: res.data.jobs }, // will be passed to the page component as props
  };
}
