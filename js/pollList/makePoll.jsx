var React = require("react");
var _ = require("lodash");
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
const containerStyle = {
    height: "auto",
    minHeight:300,
    width: 800,
    margin: "20 auto",
    textAlign: 'center',
    paddingBottom:24
};
const titleStyle = {
    paddingTop:10
};
var MakePoll = React.createClass({
    getInitialState: function() {
        return {
            name:"",
            itemList:[
            ]
        };
    },
    addNewOption:function(){
        var items = this.state.itemList;
        var newItem = {
            id:items.length+1,
            type:"single",
            questionTitle:"",
            options:[]
        };
        items.push(newItem)
        this.setState({
            itemList:items
        })
    },
    handleChangeTitle: function(e,value){
        this.setState({
            name:value
        });
    },
    handleItemTitleComplete: function(i){
        var items = this.state.itemList;
        items[i.id -1] = i;
        this.setState({
            itemList:items
        });
    },
    handleItemComplete: function(){

    },
    handleSavePoll:function(){
        var PollEntity = Bmob.Object.extend("PollEntity");
        var newPoll = new PollEntity();
        newPoll.set("title",this.state.name);
        newPoll.set("generatedTime", new Date().getTime());
        newPoll.set("questionList", JSON.stringify(this.state.itemList));
        newPoll.save(null,{
            success:function(p){
                console.log(p);
            },
            error:function(e){
                console.log(e);
            }
        })
        console.log(this.state);
    },
    render: function(){
        var hasTitle = this.state.name.length >=1 ;
        var nameStyle = {}
        if(hasTitle){
            nameStyle = {
                color:"green"
            }
        }
        var actions = {
            completeTitle: this.handleItemTitleComplete,
            completeItem: this.handleItemComplete
        };
        var items = _.map(this.state.itemList,function(i,index){
            return (
                <PollItem
                    key= { _.uniqueId() }
                    data = { i }
                    actions = { actions }
                >
                </PollItem>
            )
        });
        return (
            <Paper style={containerStyle} zDepth={1}>
                <h2 style={ titleStyle }> 新投票</h2>
                <RaisedButton label="添加选项" primary={true} onClick = { this.addNewOption } />
                <RaisedButton label="保存" primary={true} onClick = { this.handleSavePoll } />
                <div className = "pollFormWrap">
                    <TextField
                        hintText="名字"
                        floatingLabelStyle = { nameStyle }
                        floatingLabelText= { hasTitle ? "ok" : "投票的名字" }
                        errorText = { hasTitle ? "" : "名字会显示在投票列表上,必填" }
                        onChange = { this.handleChangeTitle }
                        id = "title"
                        /><br/>
                    { items }
                </div>
                { this.props.children }
            </Paper>
        );
    }
});

import FlatButton from 'material-ui/lib/flat-button';
var PollItem = React.createClass({
    handleConfirmQuestion: function(e){
        if( e && e.keyCode === 13){
            var newItem = this.props.data;
            newItem.questionTitle = e.target.value
            this.props.actions.completeTitle(newItem);
        }
    },
    render: function(){
        var hasQuestionTitle = this.props.data.questionTitle.length >=1;
        var child = null;
        if(hasQuestionTitle){
            child = (
                <div>
                    <label> { this.props.data.questionTitle } </label>
                    <br/>
                    <FlatButton label="添加一个选项" primary={true} onClick = { this.handleAddOption } />
                </div>
            )
        }else{
            child = (
                <TextField
                    hintText="问题的描述"
                    floatingLabelText= "按 enter 键完成"
                    onBlur = { this.handleConfirmQuestion }
                    onKeyDown = { this.handleConfirmQuestion }
                    id = { "question_"+_.uniqueId()  }
                />
            )
        }
        return (
            <div className="itemWrap">
                { child }
            </div>
        );
    }
})
module.exports = MakePoll;
