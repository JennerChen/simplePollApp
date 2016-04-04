var React = require("react");
var {
    render
} = require('react-dom');
var {
    Router, Route, IndexRoute, Link, hashHistory, Redirect, browserHistory
} = require("react-router");
var loginApp = require('./login/login.jsx');
var config = require("./config.json");
Bmob.initialize(config.applicationId, config.restApiKey);
var App = React.createClass({
    render: function () {
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
    },
    componentDidMount: function () {
        Bmob.Pay.webPay(0.01, "充值", "给应用充值0.01元").then(function(obj) {
          //pay_content是一个空div，运行跳转到支付宝的js代码
          $("#pay_content").html(obj.html);
        }, function(err){
          console.log("发送失败:"+err);
        });
    },
});

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
), document.getElementById("container"));

// render(<Router routes={routes} history={browserHistory} />, document.getElementById("container"))
