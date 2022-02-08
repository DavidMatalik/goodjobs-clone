import { initializeApp } from 'firebase/app'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDSI09gcrq8q33gdtFL3DsK2vPtDa0rqC4',
  authDomain: 'goodjobs-c213f.firebaseapp.com',
  projectId: 'goodjobs-c213f',
  storageBucket: 'goodjobs-c213f.appspot.com',
  messagingSenderId: '57629343870',
  appId: '1:57629343870:web:ede3141eb48630c21b982f',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const createJobArray = (snapshot) => {
  let jobs = []

  snapshot.forEach((doc) => {
    jobs.push(doc.data())
  })

  return jobs
}

export const getAllJobs = async () => {
  const querySnapshot = await getDocs(collection(db, 'jobs'))
  return createJobArray(querySnapshot)
}

export const getMatchingJobs = async (searchInput) => {
  const jobQuery = query(
    collection(db, 'jobs'),
    where('tags', 'array-contains', searchInput)
  )

  const querySnapshot = await getDocs(jobQuery)
  return createJobArray(querySnapshot)
}
