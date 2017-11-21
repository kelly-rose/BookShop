"use strict"
import axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const middleware = applyMiddleware(thunk);


import reducers from './src/reducers/index';
import routes from './src/shared/App';

function handleRender(req, res){
    axios.get('http://localhost:5001/api/book')
        .then(function(response){
            // var myHtml = JSON.stringify(response.data);
            // res.render('index', {myHtml});
            // STEP-1 CREATE A REDUX STORE ON THE SERVER
            const store = createStore(reducers, {
                book:{list: {status:'SUCCESS',data:response.data}}
                // ,            cart:{ cart: [response.data]}
            },middleware)

            // console.log(store.getState().book.list.data);
            // STEP-2 GET INITIAL STATE FROM THE STORE
            const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

           // console.log(initialState)
            // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
            const context = {};
            console.log("How context looks like? ", context.url);
            const reactComponent =renderToString(
                <Provider store={store}>
                    <StaticRouter
                        location={req.url}
                        context={context}>
                        {routes}
                    </StaticRouter>
                </Provider>
            );

            if (context.url) {
                // can use the `context.status` that
                // we added in RedirectWithStatus
                redirect(context.status, context.url)
            } else {
                res.status(200).render('index', {reactComponent, initialState})
            }

        })
        .catch(function(err){
            console.log('#Initial Server-side rendering error', err);
        })
}

module.exports = handleRender;