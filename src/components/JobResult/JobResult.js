import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobActuality } from '../../helpers/formatting'
import { getCompanyLogos } from '../../services/services'
import './JobResult.scss'

function JobResult({ fetchedJobs, jobSearchMatch, setSelectedJob }) {
  const [logoUrls, setlogoUrls] = useState(null)
  const [jobsOutput, setJobsOutput] = useState(null)

  useEffect(() => {
    if (fetchedJobs) {
      const jobLogos = []
      fetchedJobs.forEach((job) => {
        jobLogos.push({ id: job.id, logoUrl: job.company.logoUrl })
      })

      getCompanyLogos(jobLogos).then((urls) => {
        setlogoUrls(urls)
      })
    }
  }, [fetchedJobs])

  useEffect(() => {
    if (logoUrls) {
      setJobsOutput(
        fetchedJobs.map((job) => {
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
                <img src={logoUrls[job.id]} alt='Logo' />
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
      {jobsOutput && (
        <section className='job-results'>
          {jobSearchMatch ? (
            <p className='job-counter'>
              {fetchedJobs && `${fetchedJobs.length} Ergebnis`}
              {fetchedJobs && fetchedJobs.length !== 1 ? 'se' : ''}
            </p>
          ) : (
            <p className='no-matches'>
              Wir konnten leider keine passenden Jobs für dich finden. Aber
              vielleicht ist einer dieser Jobs interessant?
            </p>
          )}
          {jobsOutput && jobsOutput}
        </section>
      )}
    </>
  )
}

export default JobResult
