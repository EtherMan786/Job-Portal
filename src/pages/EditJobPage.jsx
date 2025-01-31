import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

// EditJobPage Component
const EditJobPage = ({ deleteJob, updateJobSubmit }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`https://job-apiz.netlify.app/.netlify/functions/api/jobs`);
        if (!res.ok) {
          throw new Error(`Failed to fetch job details: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const foundJob = data.jobs.find(j => j.id === id);
        if (!foundJob) {
          throw new Error(`Job with ID ${id} not found`);
        }
        setJob(foundJob);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    deleteJob(jobId);
    toast.success('Job deleted Successfully');
    navigate('/jobs');
  };

  const submitForm = (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title: job.title,
      type: job.type,
      location: job.location,
      description: job.description,
      salary: job.salary,
      company: {
        name: job.company.name,
        description: job.company.description,
        contactEmail: job.company.contactEmail,
        contactPhone: job.company.contactPhone,
      },
    };

    console.log("updatedJob",updatedJob);

    updateJobSubmit(updatedJob);

    toast.success('Job Updated Successfully');
    navigate(`/jobs`);
    // navigate(`/jobs/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Job
            </h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Job Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={job.type}
                onChange={(e) => setJob({ ...job, type: e.target.value })}
              >
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Remote'>Remote</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Job Listing Name
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any job duties, expectations, requirements, etc'
                value={job.description}
                onChange={(e) => setJob({ ...job, description: e.target.value })}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Salary
              </label>
              <select
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3'
                required
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
              >
                <option value='Under $50K'>Under $50K</option>
                <option value='$50K - 60K'>$50K - $60K</option>
                <option value='$60K - 70K'>$60K - $70K</option>
                <option value='$70K - 80K'>$70K - $80K</option>
                <option value='$80K - 90K'>$80K - $90K</option>
                <option value='$90K - 100K'>$90K - $100K</option>
                <option value='$100K - 125K'>$100K - $125K</option>
                <option value='$125K - 150K'>$125K - $150K</option>
                <option value='$150K - 175K'>$150K - $175K</option>
                <option value='$175K - 200K'>$175K - $200K</option>
                <option value='Over $200K'>Over $200K</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
              />
            </div>

            <h3 className='text-2xl mb-5'>Company Info</h3>

            <div className='mb-4'>
              <label
                htmlFor='company'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Name
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
                placeholder='Company Name'
                value={job.company.name}
                onChange={(e) => setJob({ ...job, company: { ...job.company, name: e.target.value } })}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='company_description'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Description
              </label>
              <textarea
                id='company_description'
                name='company_description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='What does your company do?'
                value={job.company.description}
                onChange={(e) => setJob({ ...job, company: { ...job.company, description: e.target.value } })}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3'
                placeholder='Email address for applicants'
                required
                value={job.company.contactEmail}
                onChange={(e) => setJob({ ...job, company: { ...job.company, contactEmail: e.target.value } })}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='contact_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Phone
              </label>
              <input
                type='tel'
                id='contact_phone'
                name='contact_phone'
                className='border rounded w-full py-2 px-3'
                placeholder='Optional phone for applicants'
                value={job.company.contactPhone}
                onChange={(e) => setJob({ ...job, company: { ...job.company, contactPhone: e.target.value } })}
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Job
              </button>
            </div>
          </form>
          <button onClick={() => onDeleteClick(job.id)} className='mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'>
            Delete Job
          </button>
        </div>
      </div>
    </section>
  );
};

export { EditJobPage as default };
