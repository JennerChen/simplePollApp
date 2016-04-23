var React = require("react");
var { Link } = require("react-router");
var Signined = require("./signined.jsx");

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

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
            <AppBar
                title="Poll"
                onLeftIconButtonTouchTap = { this.handleTouch }
                iconElementRight={
                    user
                }
            >
            </AppBar>
        );
    },
    handleTouch: function(e){
        console.log(e);
    }
});
module.exports = HeaderBar;
