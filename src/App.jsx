import React from 'react'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { toast } from 'react-toastify';

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, { jobLoader } from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    console.log(newJob);
    const res = await fetch('https://job-apiz.netlify.app/.netlify/functions/api/jobs', {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(newJob)
    });
    return;
  }

  // Delete Job
  const deleteJob = async (id) => {
    console.log("delete",id);
    const res = await fetch(`https://job-apiz.netlify.app/.netlify/functions/api/jobs/${id}`, {
      method : 'DELETE'
    });
    return;
  }

  const updateJobSubmit = async (updatedJob) => {
    try {
      const res = await fetch(`https://job-apiz.netlify.app/.netlify/functions/api/jobs/${updatedJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) {
        throw new Error(`Failed to update job: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      // toast.error(`Error updating job: ${error.message}`);
      console.log(`error.message,${error.message}`);
    }
  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
  
        <Route index element={<HomePage />} />
  
        <Route path='/Jobs' element={<JobsPage />} />
        <Route path='/Jobs/:id' element={<JobPage deleteJob={ deleteJob }  />} loader={jobLoader} />
  
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        {/* <Route path='/add-job/:id' element={<AddJobPage />} /> */}

        {/* <Route path='/edit-job' element={<EditJobPage  />} /> */}
        <Route path='/edit-job/:id' element={<EditJobPage deleteJob={deleteJob} updateJobSubmit={updateJobSubmit} />} />
  
        <Route path='*' element={<NotFoundPage />} />
  
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App