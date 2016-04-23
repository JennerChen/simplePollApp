var React = require("react");
import Paper from 'material-ui/lib/paper';

var PollListToolBar = require("./pollListToolBar");

const style = {
    height: "auto",
    minHeight:300,
    width: 850,
    margin: "20 auto",
    textAlign: 'center'
};
const style2 = {
    height: "300",
    minHeight:300,
    width: 650,
    margin: "10 auto",
    textAlign: 'center'
};
// <Paper style= {style2} zDepth = {2}>
// </Paper>
var PollContainer = React.createClass({
    render: function () {
        return (
            <Paper style={style} zDepth={1}>
                <PollListToolBar></PollListToolBar>
                { this.props.children }
            </Paper>
        );
    }
});
module.exports = PollContainer;
