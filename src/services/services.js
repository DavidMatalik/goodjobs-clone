import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
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

export const getUserFavorites = async () => {
  const auth = getAuth()
  const docRef = doc(db, 'users', auth.currentUser.uid)
  try {
    const docSnap = await getDoc(docRef)
    return docSnap.data().favorites
  } catch {
    setDoc(docRef, { favorites: [] })
  }
}

export const removeUserFavorite = async (favoriteId) => {
  const auth = getAuth()
  const docRef = doc(db, 'users', auth.currentUser.uid)
  updateDoc(docRef, {
    favorites: arrayRemove(favoriteId),
  })
}

export const addUserFavorite = async (favoriteId) => {
  const auth = getAuth()
  const docRef = doc(db, 'users', auth.currentUser.uid)
  updateDoc(docRef, {
    favorites: arrayUnion(favoriteId),
  })
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

export const registerNewUser = async (email, password) => {
  const auth = getAuth()
  return createUserWithEmailAndPassword(auth, email, password).catch((err) => {
    return Promise.reject(err)
  })
}

export const loginUserWithEmail = async (email, password) => {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password).catch((err) => {
    return Promise.reject(err)
  })
}

export const loginUserWithGithub = async () => {
  const auth = getAuth()
  const provider = new GithubAuthProvider()
  provider.setCustomParameters({
    redirect_uri: 'https://goodjobs-c213f.web.app/',
  })
  return signInWithRedirect(auth, provider)
}

export const sendResetEmail = async (email) => {
  const auth = getAuth()
  return sendPasswordResetEmail(auth, email).catch((err) => {
    return Promise.reject(err)
  })
}

export const signOutUser = async () => {
  const auth = getAuth()
  signOut(auth)
}

export const addUserChangeListener = (setUser, setLoading) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (userToken) => {
    if (userToken) {
      // User is signed in
      setUser(userToken)
    } else {
      // No user is signed in
      setUser(null)
    }
    setLoading(false)
  })
}
