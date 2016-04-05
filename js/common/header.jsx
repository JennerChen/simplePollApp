var React = require("react");
var { Link } = require("react-router");
var HeaderBar = React.createClass({
    render: function(){
        var user;
        var userEntity = this.props.user;
        if(userEntity){
            user = (
                <Signined userEntity>
                </Signined>
            );
        }else{
            user = (
                <li><Link to='/login'>登录</Link></li>
            );
        }
        return (
            <div className="navbar navbar-default">
                <div className="container">
                    <a className="navbar-brand" href="#">Poll</a>
                    <ul className="nav navbar-nav">
                      <li className="active"><a href="#">Active</a></li>
                      <li><a href="#">Link</a></li>
                    </ul>
                    <form className="navbar-form navbar-left">
                        <div className="form-group is-empty">
                            <input type="text" className="form-control col-sm-8" placeholder="Search" />
                            <span className="material-input"></span>
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                        { user }
                    </ul>
                </div>
            </div>
        );
    }
});
var Signined = React.createClass({
    render: function(){
        return (
            <li className="dropdown">
                <a Link = "#" data-target="#" className="dropdown-toggle" data-toggle="dropdown">{ this.props.user.name }
                    <b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                </ul>
            </li>
        );
    }
});
module.exports = HeaderBar;
