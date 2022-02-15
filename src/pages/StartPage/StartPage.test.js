import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import StartPage from './StartPage'
jest.mock('../../services/services.js')

test('Navigates to jobsPpage and displays jobs, related to empty input', async () => {
  render(
    <App>
      <StartPage />
    </App>
  )
  const jobSearchButton = screen.getByRole('button')

  // Empty input returns two mocked job objects
  userEvent.click(jobSearchButton)

  expect(await screen.findAllByAltText('Logo')).toHaveLength(2)
  expect(
    await screen.findByText('Such dich glücklich mit GoodJobs!')
  ).toBeInTheDocument()
})
