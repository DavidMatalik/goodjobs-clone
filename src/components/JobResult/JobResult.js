import { useEffect, useState } from 'react'
import { getCompanyLogos } from '../../services/services'

function JobResult({ fetchedJobs, jobSearchMatch }) {
  const [logoUrls, setlogoUrls] = useState(null)
  const [jobsOutput, setJobsOutput] = useState(null)

  console.log("fetchedJobs in JobResult", fetchedJobs)
  console.log("logoUrls in JobResult", logoUrls)
  console.log("jobsOutput in JobResult", jobsOutput)

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
            <div className='job-result' key={job.id}>
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
          )
        })
      )
    }
  }, [logoUrls])

  const getJobActuality = (creationDate) => {
    const diffInSeconds = Date.now() / 1000 - new Date(creationDate)

    const diffInHours = Math.round(diffInSeconds / (60 * 60))
    if (diffInHours <= 24) {
      return `${diffInHours} Stunde${diffInHours !== 1 ? 'n' : ''}`
    }

    const diffInDays = Math.round(diffInSeconds / (60 * 60 * 24))
    if (diffInDays < 7) {
      return `${diffInDays} Tag${diffInDays !== 1 ? 'en' : ''}`
    }

    const diffInWeeks = Math.round(diffInSeconds / (60 * 60 * 24 * 7))
    if (diffInWeeks < 4) {
      return `${diffInWeeks} Woche${diffInWeeks !== 1 ? 'n' : ''}`
    }

    const diffInMonths = Math.round(diffInSeconds / (60 * 60 * 24 * 30))
    return `${diffInMonths} Monat${diffInMonths !== 1 ? 'en' : ''}`
  }

  return (
    <>
      {jobsOutput &&
        (<section className='job-results'>
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
        </section>)
      }
    </>
  )
}

export default JobResult
