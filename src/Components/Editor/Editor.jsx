import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "./Editor.css";
import { useEffect, useState, useContext } from "react";
import { EditorView } from "@codemirror/view";
import { FaPencilAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import UserContext from "../../Context/Context";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
// import { auth, db } from "../Firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";
const Editor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [edit, setEdit] = useState("Untitled");
  const [editopen, setEditOpen] = useState(false);
  const { isLoggedIn, userData } = useContext(UserContext);
  const { setIsLoggedIn, toast, setLoader, setUserData, setPenData, penData } =
    useContext(UserContext);
  const [logoutDropdown, setLogoutDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let signupStyle = {
    display: location.pathname === "/auth/signup" ? "none" : "",
  };
  let loginStyle = {
    display: location.pathname === "/auth/login" ? "none" : "",
  };
  const addData = async () => {
    const id = userData.length ? userData[0].uid : null;
    if (id && output !== "") {
      await setDoc(doc(db, "userDetails", id), {
        name: userData[0].name ? userData[0].name : userData[0].displayName,
        details: penData,
      })
        .then(() => toast.success("Project Added Successfully"))
        .catch((error) => toast.error(error.message));
    }
  };

  useEffect(() => {
    addData();
    setHtml("");
    setCss("");
    setJs("");
    setOutput("");
    setEdit("Untitled");
   
  }, [penData]);

  let handleSave = async () => {
    if (!isLoggedIn) {
      toast.error(
        "You’ll have to Log In or Sign Up (for free!) to save your Pen."
      );
    } else {
      const id = userData.length ? userData[0].uid : "";
      const editorData = {
        id: id,
        title: edit,
        html: html,
        css: css,
        js: js,
        output: output,
        name: userData[0].name ? userData[0].name : userData[0].displayName,
      };
      setPenData((prevPenData) => [...prevPenData, editorData]);
    }
  };

  let logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      toast.success("Logged Out Successfully");
      setUserData([]);
      setLoader(true);
      setPenData([]);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCode = () => {
    const CombineCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setOutput(CombineCode);
  };

  useEffect(() => {
    updateCode();
  
  }, [html, css, js]);

  return (
    <div className="pen">
      <div className="penHeader">
        <div className="logo-title-section">
          <div className="logo">
            <NavLink to={"/"}>
              <svg viewBox="0 0 100 100" title="CodePen" fill="white">
                <path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3 88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8 19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2 34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path>
              </svg>
            </NavLink>
          </div>
          <div className="title-username">
            <div className="titlesection">
              <div className="title">
                {editopen ? (
                  <input
                    type="text"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />
                ) : (
                  <p>{edit.length > 15 ? edit.slice(0, 15) + "...." : edit}</p>
                )}
              </div>
              <div className="button">
                {editopen ? (
                  <TiTick className="tick" onClick={() => setEditOpen(false)} />
                ) : (
                  <FaPencilAlt
                    className="edit"
                    onClick={() => setEditOpen(true)}
                  />
                )}
              </div>
            </div>
            <div className="username">
              {isLoggedIn ? (
                userData.length ? (
                  userData[0].displayName ? (
                    userData[0].displayName.length > 15 ? (
                      <p>{userData[0].displayName.slice(0, 15)}....</p>
                    ) : (
                      <p>{userData[0].displayName}</p>
                    )
                  ) : userData[0].name.length > 15 ? (
                    <p>{userData[0].name.slice(0, 14)}....</p>
                  ) : (
                    <p>{userData[0].name}</p>
                  )
                ) : (
                  ""
                )
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
        <div className="buttons-Section">
          <div
            className="buttons"
            style={{ display: isLoggedIn ? "none" : "" }}
          >
            <div className="saveCode">
              <button onClick={handleSave}>Save</button>
            </div>
            <div className="signup" style={signupStyle}>
              <NavLink to={"/auth/signup"}>
                <button>Sign Up</button>
              </NavLink>
            </div>

            <div className="login" style={loginStyle}>
              <NavLink to={"/auth/login"}>
                <button>Log In</button>
              </NavLink>
            </div>
          </div>
          <div
            className="afterlogin"
            style={{ display: !isLoggedIn ? "none" : "" }}
          >
            <div className="saveCode">
              <button onClick={handleSave}>Save</button>
            </div>
            <div className="userImage">
              {userData.length ? (
                userData[0].photoURL ? (
                  <img src={userData[0].photoURL} alt="" />
                ) : (
                  <div className="alternate">
                    {userData[0].displayName ? (
                      <p>{userData[0].displayName[0].toUpperCase()}</p>
                    ) : (
                      <p>{userData[0].name[0].toUpperCase()}</p>
                    )}
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            <div
              className="signoutdropdown"
              onClick={() => setLogoutDropdown(!logoutDropdown)}
            >
              <div className="icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  style={{ transform: logoutDropdown ? "rotate(180deg)" : "" }}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                </svg>
              </div>
              <div
                className="logoutdropdown"
                style={{ opacity: logoutDropdown ? "1" : "" }}
              >
                {userData.length ? (
                  userData[0].displayName ? (
                    userData[0].displayName.length > 14 ? (
                      <p>Hi, {userData[0].displayName.slice(0, 14)}....</p>
                    ) : (
                      <p>Hi, {userData[0].displayName}</p>
                    )
                  ) : userData[0].name.length > 14 ? (
                    <p>Hi, {userData[0].name.slice(0, 14)}....</p>
                  ) : (
                    <p>Hi, {userData[0].name}</p>
                  )
                ) : (
                  ""
                )}
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="editor-output">
        <div className="editorBox">
          <div className="html commonBox">
            <div className="html-header commonHeader">
              <div className="boxtitle">
                <div className="logo">
                  <svg viewBox="0 0 15 15" className="logosvg">
                    <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
                    <path
                      d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
                      fill="#28282B"
                    ></path>
                  </svg>
                </div>
                <p>HTML</p>
              </div>
            </div>
            <div className="codemirror">
              <CodeMirror
                value={html}
                height="288px"
                theme={"dark"}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                onChange={(value, viewUpdate) => {
                  setHtml(value);
                }}
              />
            </div>
          </div>

          <div className="css commonBox">
            <div className="css-header commonHeader">
              <div className="boxtitle">
                <div className="logo">
                  <svg
                    viewBox="0 0 15 15"
                    className="logosvg"
                    id="icon-file-css"
                  >
                    <rect fill="#0EBEFF" width="15" height="15" rx="4"></rect>
                    <path
                      d="M8 8.366l1.845 1.065a.507.507 0 0 0 .686-.181.507.507 0 0 0-.186-.685L8.5 7.5l1.845-1.065a.507.507 0 0 0 .186-.685.507.507 0 0 0-.686-.181L8 6.634v-2.13A.507.507 0 0 0 7.5 4c-.268 0-.5.225-.5.503v2.131L5.155 5.569a.507.507 0 0 0-.686.181.507.507 0 0 0 .186.685L6.5 7.5 4.655 8.565a.507.507 0 0 0-.186.685c.134.232.445.32.686.181L7 8.366v2.13c0 .271.224.504.5.504.268 0 .5-.225.5-.503V8.366z"
                      fill="#282828"
                    ></path>
                  </svg>
                </div>
                <p>CSS</p>
              </div>
            </div>
            <div className="codemirror">
              <CodeMirror
                value={css}
                height="288px"
                theme={"dark"}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                onChange={(value, viewUpdate) => {
                  setCss(value);
                }}
              />
            </div>
          </div>

          <div className="js commonBox">
            <div className="js-header commonHeader">
              <div className="boxtitle">
                <div className="logo">
                  <svg viewBox="0 0 15 15" className="logosvg">
                    <rect fill="#FCD000" width="15" height="15" rx="4"></rect>
                    <path
                      d="M6.554 3.705c0 .267-.19.496-.452.543-1.2.217-2.12 1.61-2.12 3.275 0 1.665.92 3.057 2.12 3.274a.554.554 0 0 1-.205 1.087c-1.733-.322-3.022-2.175-3.022-4.361 0-2.187 1.289-4.04 3.022-4.362a.554.554 0 0 1 .657.544zm1.892 0c0-.347.316-.607.657-.544 1.733.322 3.022 2.175 3.022 4.362 0 2.186-1.289 4.04-3.022 4.361a.554.554 0 0 1-.205-1.087c1.2-.217 2.12-1.61 2.12-3.274 0-1.665-.92-3.058-2.12-3.275a.551.551 0 0 1-.452-.543z"
                      fill="#282828"
                    ></path>
                  </svg>
                </div>
                <p>JS</p>
              </div>
            </div>
            <div className="codemirror">
              <CodeMirror
                value={js}
                height="288px"
                theme={"dark"}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                onChange={(value, viewUpdate) => {
                  setJs(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="output">
          <iframe
            title="output"
            srcDoc={output}
            style={{ border: "none", height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;