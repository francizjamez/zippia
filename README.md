# Zeppia Jobs finder

## Author: Francis James Dela Cruz

### Overview:

- Zeppia jobs finder is an app where we get 40 jobs from Zeppia that that matches the criteria from the payload in the post request in Zeppia's endpoint: https://www.zippia.com/api/jobs/
- We only show maximum 10 jobs at a time, in order for other jobs to show there is a search input where we can type a company name and it will only show jobs that partially matches the company name with the given input.
- An additional filter can be triggered in order to show only recent jobs which are jobs that are posted no longer than 7 days ago.

### Misc

- The jobs are taken from a post request the endpoint https://www.zippia.com/api/jobs/ with a payload of

```
{
  "companySkills": true,
  "dismissedListingHashes": [],
  "fetchJobDesc": true,
  "jobTitle": "Business Analyst",
  "locations": [],
  "numJobs": 20,
  "previousListingHashes": []
}
```

- Techs used: Nextjs, Tailwindcss, Zustand

### About the project

- This is a paid test/project by Zeppia
- This test/project is from Upwork

### About the Author

- Github: https://github.com/francizjamez
- Upwork: https://www.upwork.com/freelancers/~01f77dce4617b627c1
- Email: francizjamez@gmail.com / francizjamez2@gmail.com
