import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import { getJobActuality } from '../../helpers/formatting'
import './DetailsPage.scss'

function DetailsPage({ fetchedJobs, selectedJob }) {
  const chosenJob = fetchedJobs.find((job) => {
    return job.id === selectedJob.id
  })

  const [open, setOpen] = useState(false)

  const showContactPopup = () => {
    setOpen(true)
  }

  const closeContactPopup = () => {
    setOpen(false)
  }

  return (
    <div className='job-details-page'>
      <Header />
      <section className='job-detail-overview'>
        <div className='job-short-description'>
          <h1 className='job-title'>{chosenJob.title}</h1>
          <h3 className='job-company'>{chosenJob.company.name}</h3>
          <p className='job-keywords'>
            vor {getJobActuality(chosenJob.creationDate.seconds)} ·{' '}
            {chosenJob.place} {chosenJob.remote && '| Remote möglich'}{' '}
            {chosenJob.tags.map(
              (tag) => `· ${tag[0].toUpperCase()}${tag.slice(1)} `
            )}
          </p>
          <Button
            className='apply-button'
            variant='outlined'
            onClick={showContactPopup}
          >
            Bewerben
          </Button>
        </div>
        <div className='company-logo-wrapper'>
          <img src={selectedJob.logoUrl} alt='company-logo' />
        </div>
      </section>
      <section className='job-detail-description'>
        {chosenJob.detailsDescription.map((details, i) => {
          return (
            <div className='job-detail-paragraph' key={`${i}${details.title}`}>
              <h2>{details.title}</h2>
              <ul>
                {details.points.map((point, j) => (
                  <li key={`${j}${i}`}>{point}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>
      <Button
        className='apply-button bottom-button'
        variant='outlined'
        onClick={showContactPopup}
      >
        Bewerben
      </Button>

      <Dialog
        open={open}
        onClose={closeContactPopup}
        aria-labelledby='company-contact-title'
        aria-describedby='company-contact-description'
      >
        <DialogTitle id='company-contact-title' className='contact-popup-title'>
          {'Bewerbung per E-Mail'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='company-contact-description'
            className='contact-popup-description'
          >
            Die Company, für die du dich bewerben willst, hat die E-Mail Adresse{' '}
            <strong>{chosenJob.company.email}</strong> für Bewerbungen
            hinterlegt. Bewirb dich einfach direkt per E-Mail und verweise auch
            auf goodjobs dabei. Viel Erfolg!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className='contact-popup-button'
            variant='outlined'
            onClick={closeContactPopup}
          >
            Alles klar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DetailsPage
