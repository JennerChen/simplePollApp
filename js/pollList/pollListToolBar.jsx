import React from "react";

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

var PollListToolBar = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    makeNewPoll:function(){
        this.context.router.push("/polls/new");
    },
    render: function () {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true} float="left">
                    <DropDownMenu value={1}>
                        <MenuItem value={1} primaryText="所有投票" />
                        <MenuItem value={2} primaryText="正在进行" />
                        <MenuItem value={3} primaryText="完成的投票" />
                        <MenuItem value={4} primaryText="即将开始" />
                        <MenuItem value={5} primaryText="今天" />
                        <MenuItem value={6} primaryText="最近3天" />
                        <MenuItem value={7} primaryText="最近一周" />
                    </DropDownMenu>
                </ToolbarGroup>
                <ToolbarGroup float="right">
                    <IconMenu
                    iconButtonElement={
                        <IconButton touch={true}>
                            <NavigationExpandMoreIcon />
                        </IconButton>
                    }
                    >
                        <MenuItem primaryText="水平布局" />
                        <MenuItem primaryText="网状布局" />
                    </IconMenu>
                    <ToolbarSeparator />
                    <RaisedButton label="新建投票" primary={true} onClick = { this.makeNewPoll } />
                </ToolbarGroup>
            </Toolbar>
        )
    }
});
module.exports = PollListToolBar;
