import { useContext, useState } from "react"
import "./SignIn.css";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import UserContext from "../../../Context/Context"
import { useNavigate } from "react-router-dom"

const firebaseConfig = {
  apiKey: "AIzaSyDR5yJafz-N4F5M3Hyco7qbCOrZ2ONv9XM",
  authDomain: "codepen-284e3.firebaseapp.com",
  projectId: "codepen-284e3",
  storageBucket: "codepen-284e3.appspot.com",
  messagingSenderId: "998717741226",
  appId:"1:998717741226:web:df10aa2cf12f33fd6898d3"
};

const SignUp = () => {
  const [formOpen , setFormOpen] = useState(false);
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const { setIsLoggedIn , toast , setLoader , setUserData , penData , setPenData} = useContext(UserContext);
  const navigate = useNavigate();

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const createNewUser = async () => {
    if(name !== ""){
      try {
        const userDetails = await createUserWithEmailAndPassword(auth, email, password);
        setUserData([{name : name , ...userDetails.user.providerData[0]}])
        await setDoc(doc(db, "userDetails", userDetails.user.providerData[0].uid), {
          name : name,
          details : penData,
        });
        setIsLoggedIn(true);
        toast.success("User Created");
        setLoader(true);
        navigate("/" , {replace : true})
      } catch (error) {
          toast.error(error.message)
      }
    } else{
      toast.error("Enter your Name")
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user.providerData[0];
      setUserData([{name : userData.displayName, email: userData.email, photoURL: userData.photoURL}]);
      setIsLoggedIn(true);
      toast.success("User Signed Up with Google");
      setLoader(true);
      navigate("/", {replace : true});
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="signupbox">
      <div className="signup-header"></div>
      <div className="links-form">
        <div className="links">
          <div className="google">
            <button onClick={handleGoogleSignIn}>
              <svg width="26" height="26" viewBox="0 0 186.69 190.5"><g transform="translate(1184.583 765.171)"><path clipPath="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"></path><path clipPath="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"></path><path clipPath="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"></path><path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clipPath="none" mask="none"></path></g></svg>
              <p>Sign Up with Google</p>
            </button>
          </div>
        </div>
        <p className="or">Or,</p>
        <div className="form">
          <button className="signupbutton" onClick={() => setFormOpen(!formOpen)}>Sign Up with Email</button>
          <form style={{display : (formOpen) ? "block" : ""}}>
            <div className="name commons">
              <label htmlFor="Your-Name">Your Name</label>
              <input type="text"  value={name} id="Your-Name" required onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="Email commons">
              <label htmlFor="Email">Email</label>
              <input type="email" value={email}  id="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="password commons">
              <label htmlFor="password">Choose Password</label>
              <input type="password" value={password}  id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={(e) => {
              e.preventDefault()
              createNewUser()  
              setEmail("")
              setName("")
              setPassword("")
              setUserName("")}}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
