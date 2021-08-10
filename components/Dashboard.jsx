import Image from "next/image";
import useJobFilterStore from "../store/jobsFilterStore";

//The dashboard component
const Dashboard = () => {
  const setCompany = useJobFilterStore((state) => state.setCompany);
  const setRecent = useJobFilterStore((state) => state.setRecent);
  const recent = useJobFilterStore((state) => state.recent);
  const isFilterShowing = useJobFilterStore((state) => state.isFilterShowing);
  return (
    <div className="bg-zippia-primary p-4 relative flex justify-between items-center">
      <div className="ml-4">
        <Image src="/zippiaLogo.svg" width="158" height="36"></Image>
      </div>
      <div
        className={`${!isFilterShowing && `opacity-0`}
        transition fixed sm:absolute z-10 w-screen grid place-items-center left-0 
      `}
      >
        <div className="rounded bg-white p-4 px-8 shadow-lg relative top-24 md:top-10 z-10">
          <div className="flex gap-4 items-center flex-col md:flex-row">
            <div className="absolute left-9 top-5">
              <Image src="/searchIcon.png" width="32" height="32" />
            </div>
            <input
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Search for jobs by company"
              className="pl-9 border border-gray-500 rounded h-10 w-64"
            />
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="recent"
                value={recent}
                onChange={() => setRecent(!recent)}
              />
              <label htmlFor="recent" className="cursor-pointer select-none">
                RECENT
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
