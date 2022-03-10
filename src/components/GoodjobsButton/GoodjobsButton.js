import { Button } from '@mui/material'
import './GoodjobsButton.scss'

function GoodjobsButton({ theme, type, width = '150px', children, onClick }) {
  return (
    <Button
      className={`goodjobs-button ${
        theme === 'black' ? 'button-black' : 'button-red'
      }`}
      variant='outlined'
      type={type}
      sx={{ width: width }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default GoodjobsButton
