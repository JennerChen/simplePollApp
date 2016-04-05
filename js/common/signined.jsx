var React = require("react");
var { Link } = require("react-router");
var Signined = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    signout:function(){
        Bmob.User.logOut();
        this.context.router.push("/login");
    },
    render: function(){
        return (
            <li className="dropdown">
                <a Link = "#" data-target="#" className="dropdown-toggle" data-toggle="dropdown">{ this.props.user.attributes.username }
                    <b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li><Link to="/polls/new" >新问卷</Link></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li className="divider"></li>
                    <li><a href="#" onClick = { this.signout }>登出</a></li>
                </ul>
            </li>
        );
    }
});
module.exports = Signined;
