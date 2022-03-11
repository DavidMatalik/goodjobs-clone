import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import GoodjobsButton from '../../components/GoodjobsButton/GoodjobsButton'
import Header from '../../components/Header/Header'
import { getJobActuality } from '../../helpers/formatting'
import heartIconEmpty from '../../img/heart-empty.svg'
import heartIconFilled from '../../img/heart-filled.svg'
import { addUserFavorite, removeUserFavorite } from '../../services/services'
import './DetailsPage.scss'

function DetailsPage({ fetchedJobs, selectedJob, user, loading }) {
  const chosenJob = fetchedJobs.find((job) => {
    return job.id === selectedJob.id
  })

  const [open, setOpen] = useState(false)
  const [favoriteJob, setFavoriteJob] = useState(() => {
    if (user && user.favorites && user.favorites.length > 0) {
      const favorite = user.favorites.find(
        (favoriteId) => favoriteId === selectedJob.id
      )
      return Boolean(favorite)
    }
  })

  const showContactPopup = () => {
    setOpen(true)
  }

  const closeContactPopup = () => {
    setOpen(false)
  }

  const handleFavoriteClick = () => {
    if (favoriteJob) {
      removeUserFavorite(selectedJob.id)
      setFavoriteJob(false)
    } else {
      addUserFavorite(selectedJob.id)
      setFavoriteJob(true)
    }
  }

  return (
    <div className='job-details-page'>
      <Header user={user} loading={loading} />
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
          <GoodjobsButton theme='red' onClick={showContactPopup}>
            Bewerben
          </GoodjobsButton>
        </div>
        <div className='company-logo-wrapper'>
          <img src={selectedJob.logoUrl} alt='company-logo' />
        </div>
        <img
          onClick={() => handleFavoriteClick()}
          src={favoriteJob ? heartIconFilled : heartIconEmpty}
          alt='Favorit'
        />
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
            <strong>{chosenJob.company.email}</strong> für Bewerbungen
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
