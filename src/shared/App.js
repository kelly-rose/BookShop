import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {About, Footer} from '../components';
import {Address,  BookMain, Header, Signin, Signup, Contact, Admin, Cart} from "../containers";
import Thanks from "../components/Thanks";
import Invoice from "../containers/Invoice";
import ScrollToTopRoute from './ScrollToTopRoute';
import {Link} from 'react-router-dom';

// import RequireAuth from './../containers/auth/Require_auth';

// RETRIVES COMPONENTS BASED ON STATUS
const Status = function ({ code, children }){
    return (
        <Route render={function({ staticContext }) {
            if (staticContext)
                staticContext.status = code;
            return children
        }}/>
    )
}
//NOT-FOUND COMPONENT
const NotFound = function(){
    return (
        <Status code={404}>
            <div className="jumbotron text-center">
                <h1>404 Not Found</h1>
                <p>You may be lost. Follow the breadcrumbs back <Link to="/">home</Link>.</p>
            </div>
        </Status>
    )
}

// CLIENT-SERVER SHARED ROUTES
const routes = (
    <div>
        <Header/>

        <Switch>
            <ScrollToTopRoute exact={true} path="/" component={BookMain}/>
            <ScrollToTopRoute path="/signin" component={Signin}/>
            <ScrollToTopRoute path="/signup" component={Signup}/>
            <ScrollToTopRoute path="/about" component={About}/>
            <ScrollToTopRoute path="/contact" component={Contact}/>
            <ScrollToTopRoute path="/thanks" component={Thanks}/>
            <ScrollToTopRoute path="/admin" component={Admin}/>
            <ScrollToTopRoute path="/cart" component={Cart}/>
            <ScrollToTopRoute path="/address" component={Address}/>
            <ScrollToTopRoute path="/invoice" component={Invoice}/>
            <Route component={NotFound}/>
        </Switch>
        <Footer/>
    </div>
);

// class App extends Component {
//
//     render() {
//         return (
//             <div>
//                 <Header/>
//                 <div>
//                     <Route exact={true} path="/" component={BookMain}/>
//                     <Route path="/signin" component={Signin}/>
//                     <Route path="/signup" component={Signup}/>
//                     <Route path="/about" component={About}/>
//                     <Route path="/contact" component={Contact}/>
//                     <Route path="/thanks" component={Thanks}/>
//                     <Route path="/admin" component={Admin}/>
//                     <Route path="/cart" component={Cart}/>
//                     <Route path="/address" component={Address}/>
//                     <Route path="/invoice" component={Invoice}/>
//                     <Route component={NotFound}/>
//                 </div>
//                 <Footer/>
//             </div>
//         );
//     }
// }
export default routes;

