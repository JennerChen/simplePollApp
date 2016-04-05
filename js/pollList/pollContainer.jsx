var React = require("react");

var PollContainer = React.createClass({
    render:function(){
        return (
            <div>
                polllist;
                { this.props.children }
            </div>
        );
    }
});
module.exports = PollContainer;
