import React from 'react'
import {signIn} from "./_actions/actions";
import {Link} from 'react-router-dom'
import {Route, Switch} from 'react-router';
import Film from "./components/Film";
import Chat from "./components/Chat";
import Articles from "./components/Articles";
import MiniFilm from "./components/MiniFilm";
import VoteTest from "./components/VoteTest";
import ComplaintSupport from "./components/ComplaintSupport";
import FilmAdd from "./components/FilmAdd";
import LoginPage from "./components/LoginPage/loginPage";
import Customer from "./Customers";
import ActorHome from "./Customers/actor/actorHome";
import AnalystHome from "./Customers/analyst/analystHome";
import Analyst from "./Customers/analyst/analyst";
import Studio from "./Customers/studio/studio";
import StudioHome from "./Customers/studio/studioHome"
import Actor from "./Customers/actor/actor";
import RegisterPage from "./RegisterPage";
import ChangeLevel from "./components/ChangeLeavel";
import Bank from "./components/Bank";
import './App.css';


const App = () => (
    <div className="App">

        <Switch>
            <Route path='/film' component={Film}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/articles' component={Articles}/>
            <Route path='/votes' component={VoteTest}/>
            <Route path='/complaintSupport' component={ComplaintSupport}/>
            <Route path='/filmAdd' component={FilmAdd}/>

            <Route exact path='/' component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path = "/customer" component={Customer}/>

            <Route path = "/actor" component={ActorHome}/>
            <Route path = "/actorPage" component={Actor}/>

            <Route path = "/analyst" component={AnalystHome}/>
            <Route path="/analystPage" component={Analyst}/>

            <Route path="/studio" component={StudioHome}/>
            <Route path="/studioPage" component={Studio}/>

            <Route path="/s" component={Studio}/>
            <Route path="/mini" component={MiniFilm}/>
            <Route path="/changeLevel" component={ChangeLevel}/>
            <Route path="/bank" component={Bank}/>
        </Switch>

    </div>

);

export default App;