var React = require("react");
var { render } = require('react-dom');
var { Router, Route, IndexRoute, Link, hashHistory,Redirect,browserHistory   }  = require("react-router");
var loginApp = require('./login/login.jsx');
var App = React.createClass({
    render: function() {
        return (
            <div >
                <h1>App</h1>
                <ul>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/inbox'>Inbox</Link>
                    </li>
                    <li>
                        <Link to='/inbox/messages/4'>Message</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
})

// var routes = {
//   path: '/',
//   component: App,
//   indexRoute: { component: Dashboard },
//   childRoutes: [
//     { path: 'about', component: About },
//     {
//       path: 'inbox',
//       component: Inbox,
//       childRoutes: [{
//         path: 'messages/:id',
//         onEnter: function(params,replace){
//             replace(`/messages/${params.params.id}`);
//         }
//         // ({ params }, replace) => replace(`/messages/${params.id}`)
//       }]
//     },
//     {
//       component: Inbox,
//       childRoutes: [{
//         path: 'messages/:id', component: Message
//       }]
//     }
//   ]
// }
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById("container"))

// render(<Router routes={routes} history={browserHistory} />, document.getElementById("container"))
