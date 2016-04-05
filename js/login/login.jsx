var React = require("react");
var { Link } = require("react-router");
var LoginApp = React.createClass({
    render: function () {
        return (
            <div className="well" id="loginContainer">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>请登录</legend>
                        <div className="form-group label-floating is-empty loginForm">
                            <label htmlFor="username" className="control-label"><i className="fa fa-user fa-lg"></i>账号</label>
                            <input type="text" className="form-control" id='username' autoComplete= "off" />
                            <p className="help-block">请输入账号,长度大于5位</p>
                            <span className="material-input"></span>
                        </div>

                        <div className="form-group label-floating is-empty loginForm">
                            <label htmlFor="password" className="control-label"><i className="fa fa-user-secret fa-lg "></i>密码</label>
                            <input type="password" className="form-control" id='password'/>
                            <span className="help-block">请输入密码</span>
                            <span className="material-input"></span>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4 text-center">
                                <Link to = "/signup" className="btn btn-raised btn-default btn-link">没有账号 ? 注册</Link>
                                <button type="submit" className="btn btn-raised btn-primary">登录</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
});
module.exports = LoginApp;
