import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// import { auth } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";
// import { db } from "./firebase.config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const SignInOrLoginwithGoogle = async (
  context,
  navigate,
  setUserData,
  setPenData
) => {
  const { setIsLoggedIn, toast, setLoader } = context;
  try {
    let result = await signInWithPopup(auth, googleProvider);
    const userData = result.user.providerData[0];
    const userDocRef = doc(db, "userDetails", userData.uid);
    const docSnap = await getDoc(userDocRef);
    setUserData([{ ...result.user.providerData[0] }]);
    if (docSnap.exists()) {
      const userDataFromFirestore = docSnap.data();
      setPenData(userDataFromFirestore.details);
    } else {
      console.log("");
    }
    setIsLoggedIn(true);
    toast.success("User Logged In with Google");
    setLoader(true);
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Error creating user account:", error.message);
  }
};

export const SignInOrLoginwithGitHub = async (
  context,
  navigate,
  setUserData,
  setPenData
) => {
  const { setIsLoggedIn, toast, setLoader } = context;
  try {
    let result = await signInWithPopup(auth, githubProvider);
    const userData = result.user.providerData[0];
    const name = result.user.reloadUserInfo.screenName;
    const userDocRef = doc(db, "userDetails", userData.uid);
    const docSnap = await getDoc(userDocRef);
    setUserData([{ name: name, ...result.user.providerData[0] }]);
    if (docSnap.exists()) {
      const userDataFromFirestore = docSnap.data();
      setPenData(userDataFromFirestore.details);
    } else {
      console.log("");
    }
    setIsLoggedIn(true);
    toast.success("User Logged In with GitHub");
    setLoader(true);
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Error creating user account:", error.message);
  }
};

export const SignInOrLoginwithFacebook = async (
  context,
  navigate,
  setUserData,
  setPenData
) => {
  const { setIsLoggedIn, toast, setLoader } = context;
  try {
    let result = await signInWithPopup(auth, facebookProvider);
    console.log(result);
    const userData = result.user.providerData[0];
    const userDocRef = doc(db, "userDetails", userData.uid);
    const docSnap = await getDoc(userDocRef);
    setUserData([{ ...result.user.providerData[0] }]);
    if (docSnap.exists()) {
      const userDataFromFirestore = docSnap.data();
      setPenData(userDataFromFirestore.details);
    } else {
      console.log("");
    }
    setIsLoggedIn(true);
    toast.success("User Logged In with Google");
    setLoader(true);
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Error creating user account:", error.message);
  }
};
