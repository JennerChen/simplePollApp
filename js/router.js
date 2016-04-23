var React = require("react");
var {
    render
} = require('react-dom');
var {
    Router, Route, IndexRoute, Link, hashHistory, Redirect, browserHistory
} = require("react-router");
var injectTapEventPlugin = require('react-tap-event-plugin')();
var loginApp = require('./login/login.jsx');
var config = require("./config.json");
var HeaderBar = require("./common/header.jsx");
var Login = require("./login/login.jsx");
var SignUp = require("./login/signup.jsx");
var PollList = require("./pollList/pollContainer.jsx");
var MakePoll = require("./pollList/makePoll");
import RaisedButton from 'material-ui/lib/raised-button.js';

require("../css/index.less");
var App = React.createClass({
    getInitialState: function() {
        Bmob.initialize(config.applicationId, config.restApiKey);
        return {
            // currentUser : Bmob.User.current()不用再此处设置,因为 该值会变
        };
    },
    handBtnClick: function(e){
    },
    render: function () {
        var user = Bmob.User.current();
        return (
            <div >
                <HeaderBar user = { user }></HeaderBar>
                { this.props.children  }
            </div>
        );
    },
    componentDidMount: function() {
        // $.material.init();
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
                component:MakePoll,
                onEnter: function(nextState, replace){
                    replace("/new");
                }
            },
            {
                path: 'poll/:id',
                component: MakePoll
            }
        ]
    },
    {
        path:"new",
        component:MakePoll
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

render(<Router routes={routes} history={browserHistory} />, document.getElementById("container"));
