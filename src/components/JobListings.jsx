import React from 'react'

import { useEffect, useState } from 'react';
// import jobs from '../jobs.json'
import Spinner from './Spinner';

import JobListing from './JobListing'

const JobListings = ({ isHome = false }) => {
  // const jobListing = isHome ?  jobs.slice(0,3) : jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const res = await fetch('/api/jobs?_limit=3'); // Local value For Proxy
        // const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs' // For Proxy
        // const res = await fetch('https://contact-etherman.netlify.app/.netlify/functions/api/jobs');
        const res = await fetch('https://job-apiz.netlify.app/.netlify/functions/api/jobs');
        // const res = await fetch('/api/jobs');
        // const res = await fetch(apiUrl); // For Proxy
        const data = await res.json();
        setJobs(data.jobs);
        // console.log('datra', data.jobs)
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : 'Browse Jobs'} </h2>
          
            {loading ?
              (<Spinner loading={loading}/>) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobListing key={job.id} job={job} />
                  ))}
                </div>
              )}
          
        </div>
      </section>
    </>
  )
}

export default JobListings