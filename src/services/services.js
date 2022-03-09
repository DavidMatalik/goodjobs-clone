import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

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

const storage = getStorage()
export const getCompanyLogos = async (jobLogos) => {
  const logoUrls = await Promise.all(
    jobLogos.map(async (jobLogo) => {
      const storageRef = ref(storage, `company-logos/${jobLogo.logoUrl}`)
      const logoUrl = await getDownloadURL(storageRef)
      return { [jobLogo.id]: logoUrl }
    })
  )

  const formattedUrls = logoUrls.reduce((acc, cv) => {
    const key = Object.keys(cv)[0]
    acc[key] = cv[key]
    return acc
  }, {})

  return formattedUrls
}

export const registerNewUser = (email, password) => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
    }
  )
}

export const loginUserWithEmail = (email, password) => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user
    console.log(user)
  })
}

export const loginUserWithGithub = async () => {
  const auth = getAuth()
  signInWithRedirect(auth, new GithubAuthProvider())
}

export const getUserInformation = () => {
  const auth = getAuth()
  getRedirectResult(auth).then((result) => {
    const user = result.user
    console.log(user)
  })
}

export const sendResetEmail = async (email) => {
  const auth = getAuth()
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
    })
    .catch((error) => {
      return error
    })
}
