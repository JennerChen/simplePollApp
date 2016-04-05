var React = require("react");
var { Link } = require("react-router");
var Signined = require("./signined.jsx");
var HeaderBar = React.createClass({
    render: function(){
        var user;
        var userEntity = this.props.user;
        if(userEntity){
            user = (
                <Signined user= { userEntity } >
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
module.exports = HeaderBar;
