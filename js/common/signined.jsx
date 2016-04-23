var React = require("react");
var { Link } = require("react-router");

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Divider from 'material-ui/lib/divider';
var Signined = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    signout:function(){
        Bmob.User.logOut();
        this.context.router.push("/login");
    },
    handleNewPoll: function(){
        this.context.router.push("/polls/new");
    },
    render: function(){
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText={ "欢迎: "+this.props.user.attributes.username } />
                <MenuItem primaryText="新问卷" onClick={ this.handleNewPoll }>
                </MenuItem>
                <Divider />
                <MenuItem primaryText="登出" onClick = { this.signout } />
            </IconMenu>
        );
    }
});
module.exports = Signined;
