//React
import { useEffect,Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ReactAlert from 'react-alert'

//redux
import store from './store'
import { Provider } from 'react-redux'
import { loadUser } from './Redux/actions/auth'
import { LOGOUT } from './Redux/types'

//components
import SignUp from "./components/Auth/SignUp/SignUp";
import Acceuil from './components/Acceuil/Acceuil'
import Evenement from './components/Evenement/Evenement'
import NavBar from './components/layouts/NavBar/NavBar';
import Login from './components/Auth/Login/Login';
import Alert from "./components/layouts/Alert/Alert";
import AlertTemplate from "react-alert-template-basic"
import Clubs from './components/Dashboard/Clubs';
import Presidents from './components/Dashboard/President'
import ProfilePage from './components/Profile/ProfilePage'
import ScrollToTop from "./components/layouts/ScrollToTop/ScrollToTop";
import Membres from './components/Dashboard/Membres'
import Evenements from './components/Dashboard/Evenements';
import Sidebar from './components/Dashboard/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'
import Dashboard from './components/Dashboard/Statistics/Dashboard'
import Footer from "./components/layouts/Footer/Footer";


//utils
import setAuthToken from './utils/setAuthToken'

function App() {
  const options = {
    timeout: 5000,
    position: ReactAlert.positions.BOTTOM_RIGHT
  }

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })}, [])

    const Club = () => {

      return <div className="body">
            <Sidebar/>
            <Clubs/>
        </div>
    }

    const President = () =>(
        <div className = "body" >
            <Sidebar />
            <Presidents />
        </div>
    )

    const EvenementD = () =>(
        <div className ="body">
            <Sidebar />
            <Evenements />
        </div>
    )

    const Membre = () => (
        <div className = "body">
            <Sidebar />
            <Membres />
        </div>
    )

  return (
      <Provider store={store}>
        <ReactAlert.Provider template={AlertTemplate} {...options}>
          <Router>
            <Fragment>
              <ScrollToTop>
                <NavBar/>
                <Alert />
                <Routes>
                  <Route exact path="/" element={<Acceuil />}/>
                  <Route exact path="/register" element={<SignUp />}/>
                  <Route exact path='/login' element={<Login/>}/>
                  <Route exact path="/profile" element={<ProfilePage />}/>
                  <Route exact path='/evenement/:id' element={<Evenement/>}/>
                  <Route exact path='/dashboard' element={<Dashboard/>}/>
                  <Route exact path="/clubs" element={<Club/>} />
                  <Route exact path="/membres" element={<Membre/>}/>
                  <Route exact path="/evenements" element={<EvenementD />}/>
                  <Route exact path="/presidents" element={<President />}/>
                  <Route exact path='/evenement/:id/chat' element={<Chat/>}/>
                </Routes>
                <Footer/>
              </ScrollToTop>
            </Fragment>
          </Router>
        </ReactAlert.Provider>
      </Provider>
  )
}

export default App;
