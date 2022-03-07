const ALL_TWO_JOBS = [
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
  },
]

export const getAllJobs = () => {
  return ALL_TWO_JOBS
}

export const getMatchingJobs = (searchWord) => {
  return ALL_TWO_JOBS.filter((job) => {
    if (job.tags.includes(searchWord)) {
      return job
    }
  })
}

export const getCompanyLogos = async (jobLogos) => {
  const logoFakeUrls = jobLogos.map((jobLogo) => {
    return { [jobLogo.id]: 'someFakeUrl' }
  })

  const formattedlogoFakeUrls = logoFakeUrls.reduce((acc, cv) => {
    const key = Object.keys(cv)[0]
    acc[key] = cv[key]
    return acc
  }, {})

  return formattedlogoFakeUrls
}
