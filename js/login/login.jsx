var React = require("react");
var { Link } = require("react-router");
var LoginApp = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState: function() {
        return {
            usernameInvalidated:false,
            passwordInvalidated:false,
            usernameLabelText:"账号",
            passwordLabelText:"密码"
        };
    },
    login:function(){
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var newState = {};
        var flag = true;
        if(username===""){
            newState.usernameInvalidated = "用户名不能为空";
            flag = false;
        }else{
            newState.usernameInvalidated = false;
        }
        if(password===""){
            newState.passwordInvalidated = "密码不能为空";
            flag = false;
        }else{
            newState.passwordInvalidated = false;
        }
        var _this = this;
        if(flag){
            Bmob.User.logIn(username, password, {
                success: function(user) {
                    _this.context.router.push("/polls");
                },
                error: function(user, error) {
                    console.log(error);
                    if(error.code === 101){
                        _this.setState({
                            usernameInvalidated:"账号或者密码不正确",
                            passwordInvalidated:"账号或者密码不正确"
                        });
                    }
                }
            });
        }else{
            this.setState(newState);
        }
    },
    inputBlur:function(){
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        if(username !== ""){
            this.setState({
                usernameLabelText:""
            });
        }else{
            this.setState({
                usernameLabelText:"账号"
            });
        }
        if(password !== ""){
            this.setState({
                passwordLabelText:""
            });
        }else{
            this.setState({
                passwordLabelText:"密码"
            });
        }
    },
    render: function () {
        var usernameClass = "form-group label-floating is-empty loginForm";
        var passwordClass = "form-group label-floating is-empty loginForm";
        if(this.state.usernameInvalidated){
            usernameClass += " has-error";
        }
        if(this.state.passwordInvalidated){
            passwordClass += " has-error";
        }
        return (
            <div className="well" id="loginContainer">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>请登录</legend>
                        <div className= { usernameClass }>
                            <label htmlFor="username" className="control-label"><i className="fa fa-user fa-lg"></i>{ this.state.usernameLabelText }</label>
                            <input type="text" className="form-control" id='username' autoComplete= "off" required ref="username" onBlur = { this.inputBlur } />
                            <p className="help-block">{ this.state.usernameInvalidated }</p>
                            <span className="material-input"></span>
                        </div>

                        <div className={ passwordClass }>
                            <label htmlFor="password" className="control-label"><i className="fa fa-user-secret fa-lg"></i>{ this.state.passwordLabelText }</label>
                            <input type="password" className="form-control" id='password' required ref="password" onBlur = { this.inputBlur } />
                            <p className="help-block">{ this.state.passwordInvalidated }</p>
                            <span className="material-input"></span>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4 text-center">
                                <Link to = "/signup" className="btn btn-raised btn-default btn-link">没有账号 ? 注册</Link>
                                <button type="button" className="btn btn-raised btn-primary" onClick={ this.login }>登录</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    },
});
module.exports = LoginApp;
