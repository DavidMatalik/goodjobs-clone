import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobActuality } from '../../helpers/formatting'
import { getCompanyLogos } from '../../services/services'
import './JobResult.scss'

function JobResult({ title, jobs, jobSearchMatch, setSelectedJob }) {
  const [logoUrls, setlogoUrls] = useState(null)
  const [jobsOutput, setJobsOutput] = useState(null)

  useEffect(() => {
    if (jobs) {
      const jobLogos = []
      jobs.forEach((job) => {
        jobLogos.push({ id: job.id, logoUrl: job.company.logoUrl })
      })

      getCompanyLogos(jobLogos).then((urls) => {
        setlogoUrls(urls)
      })
    }
  }, [jobs])

  useEffect(() => {
    if (jobs && logoUrls) {
      setJobsOutput(
        jobs.map((job) => {
          return (
            <Link to='/job-details' className='job-details-link' key={job.id}>
              <div
                className='job-result'
                onClick={() =>
                  setSelectedJob({
                    ...job,
                    logoUrl: logoUrls[job.id],
                  })
                }
              >
                <div className='logo-wrapper'>
                  <img src={logoUrls[job.id]} alt='Logo' />
                </div>
                <div className='job-description'>
                  <p className='job-place'>
                    {job.place}
                    {job.remote ? ' | Remote möglich' : ''}
                  </p>
                  <h3>{job.title}</h3>
                  <p className='job-company'>{job.company.name}</p>
                  <p className='job-age'>
                    vor {getJobActuality(job.creationDate.seconds)}
                  </p>
                </div>
              </div>
            </Link>
          )
        })
      )
    }
  }, [logoUrls])

  return (
    <>
      <section className='job-results'>
        <h2>{title}</h2>
        {jobsOutput && jobsOutput}
      </section>
    </>
  )
}

export default JobResult
