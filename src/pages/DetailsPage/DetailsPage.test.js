/* eslint-disable testing-library/no-debugging-utils */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { BrowserRouter } from 'react-router-dom'
import DetailsPage from './DetailsPage'

const mockedsearchedJobs = [
  {
    place: 'München',
    startDate: {
      seconds: 1648764000,
      nanoseconds: 0,
    },
    description: 'dsfasf',
    language: 'englisch',
    remote: true,
    id: 'CsnMjh9rPU6d0aDjXW9d',
    company: {
      name: 'uptodate',
      logoUrl: 'sdfd',
    },
    title: 'Senior Marketing Manager',
    tags: ['marketing', 'senior', 'manager', 'organisation', 'produkt'],
    creationDate: {
      seconds: 1642719600,
      nanoseconds: 0,
    },
  },
  {
    tags: ['vertrieb', 'sales', 'manager'],
    startDate: {
      seconds: 1648764000,
      nanoseconds: 0,
    },
    place: 'Stuttgart',
    remote: false,
    company: {
      logoUrl: 'sdfdaf',
      name: 'GoodJobs',
    },
    creationDate: {
      seconds: 1642633200,
      nanoseconds: 0,
    },
    title: 'Sales Manager',
    language: 'englisch',
    id: 'KHeqNQEDGZaUEPwxdcWc',
    description: 'sdfdsf',
    detailsDescription: [
      {
        points: [
          'Performancegetriebene Planung, Entwicklung, Analyse und Optimierung von Paid Ads und Kampagnen',
          'Planung und Kontrolle deines eigenen Mediabudgets und Koordination unserer Agentur',
          'Entwickle stetig neue Strategien und probiere sie performancegetrieben aus',
          'Du unterstützt unsere SEO-Strategie, Content Marketing und Kampagnenentwicklung',
          'Reporting deiner KPIs im monatlichen Performance Review',
        ],
        title: 'Das sind deine Aufgaben bei UpToDate',
      },
      {
        points: [
          'Mindestens 2 Jahre relevante Berufserfahrung im Bereich Marketingkommunikation bzw. bei der Betreuung von Social-Media-Kanälen und/oder im PR-Bereich',
          'Beherrschung von Kommunikationstools aus den Feldern Layout, Social Media, Online Performance von Vorteil',
          'Markenführung und -entwicklung interessieren dich und du verstehst eine Marke über Content in Szene zu setzen.',
          'Du verfügst über ausgezeichnete Deutschkenntnisse, beherrschst auch die englische Sprache fließend',
          'Ausgeprägte Kommunikationsstärke, Empathie und Teamfähigkeit',
        ],
        title: 'Dein Profil',
      },
      {
        points: [
          'Dein Arbeitsplatz befindet sich in unserem lichtdurchfluteten modernen Büro in einer Fabriketage im Herzen Kreuzbergs nahe dem Schlesischen Tor mit höhenverstellbaren Tischen und hochwertigen ergonomischen Bürostühlen. Flexibles Arbeiten im Home-Office und flexible Arbeitszeiten sind ebenso möglich. ',
          'Zahlreiche kulinarische Optionen laden zudem zum gemeinsamen Lunch ein oder du nutzt einfach unsere voll ausgestattete Küche um dich selbst zu versorgen. ',
          'Wir sind alle leidenschaftliche Radfahrer:innen, sodass du dich immer auch einer Feierabendrunde anschließen kannst oder dein Commute hat bereits ausreichend Kilometer, dann findest du Duschen und Schränke um dich frisch zu machen. ',
          'Zudem erwarten dich tolle Konditionen für Bike-Parts und attraktive Partnerprogramme. In unserer Werkstatt wird auch dein Rad ein gern gesehener Gast um gewartet und repariert zu werden.',
        ],
        title: 'Wir bieten Dir',
      },
    ],
  },
]

const mockedSelectedJob = {
  id: 'KHeqNQEDGZaUEPwxdcWc',
  logoUrl: 'fakeLogoUrl',
}

const setupDetailsPage = () => {
  const history = createMemoryHistory()
  render(
    <BrowserRouter history={history}>
      <DetailsPage
        searchedJobs={mockedsearchedJobs}
        selectedJob={mockedSelectedJob}
      />
    </BrowserRouter>
  )
}

test('Displays detail content', () => {
  setupDetailsPage()

  expect(screen.getByText('Sales Manager')).toBeInTheDocument()
  expect(
    screen.getByText('Das sind deine Aufgaben bei UpToDate')
  ).toBeInTheDocument()
})

test('Application button displays correct content', () => {
  setupDetailsPage()

  expect(screen.queryByText('Bewerbung per E-Mail')).not.toBeInTheDocument()

  const firstApplicationButtonOnPage = screen.getAllByRole('button')[0]
  userEvent.click(firstApplicationButtonOnPage)
  expect(screen.getByText('Bewerbung per E-Mail')).toBeVisible()
})
