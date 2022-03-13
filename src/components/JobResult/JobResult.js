import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobActuality } from '../../helpers/formatting'
import heartIconEmpty from '../../img/heart-empty.svg'
import heartIconFilled from '../../img/heart-filled.svg'
import {
  addUserFavoriteToDb,
  getCompanyLogos,
  removeUserFavoriteFromDb,
} from '../../services/services'
import './JobResult.scss'

function JobResult({
  title,
  jobs,
  user,
  setSelectedJob,
  setFavoriteJobs,
  favoriteJobs,
}) {
  const [logoUrls, setlogoUrls] = useState(null)
  const [jobsOutput, setJobsOutput] = useState(null)
  const [hearts, setHearts] = useState(null)

  useEffect(() => {
    if (jobs) {
      const jobLogos = []
      jobs.forEach((job) => {
        jobLogos.push({ id: job.id, logoUrl: job.company.logoUrl })
      })

      getCompanyLogos(jobLogos).then((urls) => {
        setlogoUrls(urls)
      })

      console.log('Favorite Jobs', favoriteJobs)
      setHearts(
        jobs.reduce((acc, currentJob) => {
          const isFavorite = favoriteJobs.find((favoriteJob) => {
            return favoriteJob.id === currentJob.id
          })
          return { ...acc, [currentJob.id]: isFavorite }
        }, {})
      )
    }
  }, [jobs])

  const handleFavoriteClick = (job) => {
    if (hearts[job.id]) {
      removeUserFavoriteFromDb(job.id)
      setFavoriteJobs(jobs.filter((item) => item.id !== job.id))
      setHearts({ ...hearts, [hearts[job.id]]: false })
    } else {
      addUserFavoriteToDb(job.id)
      favoriteJobs
        ? setFavoriteJobs([...favoriteJobs, job])
        : setFavoriteJobs([job])
      setHearts({ ...hearts, [hearts[job.id]]: true })
    }
  }

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
                {user && (
                  <div className='favorite-icon-wrapper'>
                    <img
                      className='favorite-icon'
                      onClick={() => handleFavoriteClick(job)}
                      src={hearts[job.id] ? heartIconFilled : heartIconEmpty}
                      alt='Favorit'
                    />
                  </div>
                )}
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
