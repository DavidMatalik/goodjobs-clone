import { useState } from 'react'
import heartIconEmpty from '../../img/heart-empty.svg'
import heartIconFilled from '../../img/heart-filled.svg'
import {
  addUserFavoriteToDb,
  removeUserFavoriteFromDb,
} from '../../services/services'
import './FavoriteHeart.scss'

function FavoriteHeart({ job, favoriteJobs, setFavoriteJobs }) {
  const [heart, setHeart] = useState(() => {
    if (favoriteJobs) {
      const favorite = favoriteJobs.find(
        (favoriteJob) => favoriteJob.id === job.id
      )
      return Boolean(favorite)
    }
  })

  const toggleFavorite = (job) => {
    if (heart) {
      removeUserFavoriteFromDb(job.id)
      setFavoriteJobs(favoriteJobs.filter((item) => item.id !== job.id))
      setHeart(false)
    } else {
      addUserFavoriteToDb(job.id)
      favoriteJobs
        ? setFavoriteJobs([...favoriteJobs, job])
        : setFavoriteJobs([job])
      setHeart(true)
    }
  }

  const handleHeartClick = (ev, job) => {
    ev.stopPropagation()
    ev.preventDefault()
    toggleFavorite(job)
  }

  return (
    <img
      className='favorite-icon'
      onClick={(ev) => handleHeartClick(ev, job)}
      src={heart ? heartIconFilled : heartIconEmpty}
      alt='Favorit'
    />
  )
}

export default FavoriteHeart
