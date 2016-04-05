var React = require("react");
var Signup = React.createClass({
    getInitialState: function() {
        return {
            usernameValidated:false,
            passwordValidated:false,
            passwordPaired:false,
            email: false,
            currentFocusInput:null,
            pwdAgInvalidatedMsg:false,
            inputHasValidated:[false,false,false,false]
        };
    },
    usernameValidator: function(){
        var username = this.refs.username.value;
        var inputV = this.state.inputHasValidated;
        inputV[0] = true;
        if(username && username.length >=5){
            this.setState({
                usernameValidated:true,
                currentFocusInput: "username",
                inputHasValidated:inputV
            });
        }else{
            this.setState({
                usernameValidated:false,
                currentFocusInput: "username",
                inputHasValidated:inputV
            });
        }
    },
    passwordValidator: function(){
        var password = this.refs.password.value;
        var inputV = this.state.inputHasValidated;
        inputV[1] = true;
        if(password && password.length >=6){
            this.setState({
                passwordValidated:true,
                currentFocusInput: "password",
                inputHasValidated:inputV
            });
            // 如果重复密码框已经验证过了，那么需要重新验证
            if(this.state.passwordPaired){
                this.passwordPairValidator();
            }
        }else{
            this.setState({
                passwordValidated:false,
                currentFocusInput: "password",
                inputHasValidated:inputV
            });
        }
    },
    passwordPairValidator: function(){
        var passwordPair = this.refs.passwordPair.value;
        var password = this.refs.password.value;
        var inputV = this.state.inputHasValidated;
        inputV[2] = true;
        if(passwordPair && passwordPair.length >=6){
            if(passwordPair === password){
                this.setState({
                    passwordPaired:true,
                    currentFocusInput:"passwordPair",
                    pwdAgInvalidatedMsg:false,
                    inputHasValidated:inputV
                });
            }else{
                this.setState({
                    passwordPaired:false,
                    currentFocusInput:"passwordPair",
                    pwdAgInvalidatedMsg:"2次密码不匹配,请修改",
                    inputHasValidated:inputV
                });
            }
        }else{
            this.setState({
                passwordPaired:false,
                currentFocusInput:"passwordPair",
                pwdAgInvalidatedMsg:"密码不符合要求,长度必须不小于6位",
                inputHasValidated:inputV
            });
        }
    },
    checkMail: function() {
        var email = this.refs.email.value;
        var inputV = this.state.inputHasValidated;
        inputV[3] = true;
        var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(filter.test(email)){
            this.setState({
                email: email,
                currentFocusInput:"email",
                inputHasValidated:inputV
            });
         }else{
            //  邮箱为空,不使用邮箱
            if(email === ""){
                inputV[3] = false;
            }
            this.setState({
                email: false,
                currentFocusInput:"email",
                inputHasValidated:inputV
            });
         }
    },
    register: function(){
        if(this.state.usernameValidated && this.state.passwordValidated && this.state.passwordPaired ){
            // 验证通过，可以执行提交表单
            var user = new Bmob.User();
            user.set("username", this.refs.username.value);
            user.set("password", this.refs.password.value);
            if(this.state.email){
                user.set("email", this.refs.email.value);
            }
            user.signUp(null, {
                success: function(user) {
                    console.log(user);
                    // Hooray! Let them use the app now.
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
    },
    render: function(){
        var commonClass = "form-group label-floating is-empty signupForm";
        var inputV = this.state.inputHasValidated;
        var usernameClass = inputV[0] ? (this.state.usernameValidated ? commonClass+" has-success" : commonClass + " has-warning" ) : commonClass;
        var passwordClass = inputV[1] ? (this.state.passwordValidated ? commonClass+" has-success" : commonClass + " has-warning" ) : commonClass;
        var passwordPairClass = inputV[2] ? ( this.state.passwordPaired ? commonClass+" has-success" : commonClass + " has-warning" ) : commonClass;
        var pwdPairMsg = this.state.passwordPaired ? "验证成功" : (this.state.pwdAgInvalidatedMsg ? this.state.pwdAgInvalidatedMsg : "请再次输入密码(必填)");
        var emailClass = inputV[3] ? ( this.state.email ? commonClass+" has-success" : commonClass + " has-warning" ) : commonClass;
        switch (this.state.currentFocusInput) {
            case "username":
                usernameClass += " is-focused";
                break;
            case "password":
                passwordClass += " is-focused";
                break;
            case "passwordPair":
                passwordPairClass += " is-focused";
                break;
            case "email":
                emailClass += " is-focused";
                break;
            default:
        }
        return (
            <div className="well" id="signUpContainer">
                <form className="form-horizontal">
                    <fieldset>
                        <legend>注册</legend>
                        <div className={ usernameClass } >
                            <label htmlFor="username" className="control-label"><i className="fa fa-user fa-lg"></i> { !this.state.usernameValidated ? "用户名" : ""}</label>
                            <input type="text" className="form-control" id='username' autoComplete= "off" onChange = { this.usernameValidator } ref='username'/>
                            <p className="help-block">{ !this.state.usernameValidated ? "请输入用户名,长度大于5位(必填)" : "通过"} </p>
                            <span className="material-input"></span>
                        </div>

                        <div className={ passwordClass }>
                            <label htmlFor="password" className="control-label"><i className="fa fa-user-secret fa-lg "></i>{ !this.state.passwordValidated ? "密码" : ""}</label>
                            <input type="password" className="form-control" id='password' autoComplete= "off" onChange = { this.passwordValidator } ref='password'/>
                            <span className="help-block">{ !this.state.passwordValidated ? "请输入密码,密码不少于6位" : "验证成功"}</span>
                            <span className="material-input"></span>
                        </div>

                        <div className={ passwordPairClass }>
                            <label htmlFor="passwordAg" className="control-label"><i className="fa fa-user-secret fa-lg "></i>{ !this.state.passwordPaired ? "重复密码" : ""}</label>
                            <input type="password" className="form-control" id='passwordAg'  autoComplete= "off" onChange = { this.passwordPairValidator } ref='passwordPair' />
                            <span className="help-block"> { pwdPairMsg }</span>
                            <span className="material-input"></span>
                        </div>

                        <div className={ emailClass }>
                            <label htmlFor="useremail" className="control-label"><i className="fa fa-envelope fa-lg fa-fw"></i>{ this.state.email ? "" : "邮箱" }</label>
                            <input type="text" className="form-control" id='useremail' autoComplete= "off" onChange = { this.checkMail } ref='email'/>
                            <p className="help-block">{ this.state.email ? "邮箱可用" : "请输入邮箱,用于找回密码(非必填)" }</p>
                            <span className="material-input"></span>
                        </div>

                        <div className="form-group">
                            <div className="col-md-8 col-md-offset-4 text-center">
                                <button type="button" className="btn btn-raised btn-primary" onClick= { this.register }>注册</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
});
module.exports = Signup;
