var React = require("react");
var {
    render
} = require('react-dom');
var {
    Router, Route, IndexRoute, Link, hashHistory, Redirect, browserHistory
} = require("react-router");
var loginApp = require('./login/login.jsx');
var config = require("./config.json");
var HeaderBar = require("./common/header.jsx");
var Login = require("./login/login.jsx");
var SignUp = require("./login/signup.jsx");
var PollList = require("./pollList/pollContainer.jsx");
var MakePoll = require("./pollList/makePoll.jsx");
require("../css/index.less");
var App = React.createClass({
    getInitialState: function() {
        Bmob.initialize(config.applicationId, config.restApiKey);
        return {
            // currentUser : Bmob.User.current()不用再此处设置,因为 该值会变
        };
    },
    render: function () {
        var user = Bmob.User.current();
        return (
            <div >
                <HeaderBar user = { user }></HeaderBar>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            { this.props.children  }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        $.material.init();
    },
});
var routes = {
  path: '/',
  component: App,
  indexRoute: {
        onEnter: function(nextState, replace){
            Bmob.initialize(config.applicationId, config.restApiKey);
            if(!Bmob.User.current()){
                replace("/login");
            }else{
                replace('/polls');
            }
        }
  },
  childRoutes: [
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp },
    {
        path: 'polls',
        component: PollList,
        childRoutes:[
            {
                path: 'new',
                component:MakePoll
            }
        ]
    }
    // {
    //   path: 'inbox',
    //   component: Inbox,
    //   childRoutes: [{
    //     path: 'messages/:id',
    //     onEnter: function(params,replace){
    //         replace(`/messages/${params.params.id}`);
    //     }
    //     // ({ params }, replace) => replace(`/messages/${params.id}`)
    //   }]
    // },
    // {
    //   component: Inbox,
    //   childRoutes: [{
    //     path: 'messages/:id', component: Message
    //   }]
    // }
  ]
};
// render((
//     <Router history={hashHistory}>
//         <Route path="/" component={App}>
//
//         </Route>
//     </Router>
// ), document.getElementById("container"));

render(<Router routes={routes} history={browserHistory} />, document.getElementById("container"));
