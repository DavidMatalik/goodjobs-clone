/* eslint-disable testing-library/no-debugging-utils */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import JobsPage from './JobsPage'
jest.mock('../../services/services.js')

test('Displays jobs, related to nonsense input', async () => {
  render(
    <App>
      <JobsPage />
    </App>
  )
  const jobSearchButton = screen.getByRole('button')
  const jobSearchInput = screen.getByLabelText('Jobtitel')

  // Matching input should return one mocked job object
  userEvent.type(jobSearchInput, 'sdaf')
  userEvent.click(jobSearchButton)

  expect(await screen.findAllByAltText('Logo')).toHaveLength(2)
})

test('Displays jobs, related to empty input', async () => {
  render(
    <App>
      <JobsPage />
    </App>
  )
  const jobSearchButton = screen.getByRole('button')

  // Empty input returns two mocked job objects
  userEvent.click(jobSearchButton)

  expect(await screen.findAllByAltText('Logo')).toHaveLength(2)
})

test('Displays matching jobs, if input matches a job', async () => {
  render(
    <App>
      <JobsPage />
    </App>
  )
  const jobSearchButton = screen.getByRole('button')
  const jobSearchInput = screen.getByLabelText('Jobtitel')

  // This input returns one mocked job object
  userEvent.type(jobSearchInput, 'marketing')
  userEvent.click(jobSearchButton)

  expect(await screen.findByAltText('Logo')).toBeInTheDocument()
})
