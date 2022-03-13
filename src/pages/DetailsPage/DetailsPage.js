import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import FavoriteHeart from '../../components/FavoriteHeart/FavoriteHeart'
import GoodjobsButton from '../../components/GoodjobsButton/GoodjobsButton'
import Header from '../../components/Header/Header'
import { getJobActuality } from '../../helpers/formatting'
import './DetailsPage.scss'

function DetailsPage({
  selectedJob,
  user,
  loading,
  favoriteJobs,
  setFavoriteJobs,
}) {
  const [open, setOpen] = useState(false)

  const showContactPopup = () => {
    setOpen(true)
  }

  const closeContactPopup = () => {
    setOpen(false)
  }

  return (
    <div className='job-details-page'>
      <Header user={user} loading={loading} />
      <section className='job-detail-overview'>
        <div className='job-short-description'>
          <h1 className='job-title'>{selectedJob.title} </h1>
          <h3 className='job-company'>{selectedJob.company.name}</h3>
          <p className='job-keywords'>
            vor {getJobActuality(selectedJob.creationDate.seconds)} ·{' '}
            {selectedJob.place} {selectedJob.remote && '| Remote möglich'}{' '}
            {selectedJob.tags.map(
              (tag) => `· ${tag[0].toUpperCase()}${tag.slice(1)} `
            )}
          </p>
          <GoodjobsButton theme='red' onClick={showContactPopup}>
            Bewerben
          </GoodjobsButton>
        </div>
        <div className='icons-wrapper'>
          <div className='company-logo-wrapper'>
            <img src={selectedJob.logoUrl} alt='company-logo' />
          </div>
          {user && (
            <div className='favorite-icon-wrapper'>
              <FavoriteHeart
                job={selectedJob}
                favoriteJobs={favoriteJobs}
                setFavoriteJobs={setFavoriteJobs}
              />
            </div>
          )}
        </div>
      </section>
      <section className='job-detail-description'>
        {selectedJob.detailsDescription.map((details, i) => {
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
      <div className='bottom-button-wrapper'>
        <GoodjobsButton theme='red' onClick={showContactPopup}>
          Bewerben
        </GoodjobsButton>
      </div>

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
            <strong>{selectedJob.company.email}</strong> für Bewerbungen
            hinterlegt. Bewirb dich einfach direkt per E-Mail und verweise auch
            auf goodjobs dabei. Viel Erfolg!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <GoodjobsButton theme='black' onClick={closeContactPopup}>
            Alles klar
          </GoodjobsButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DetailsPage
