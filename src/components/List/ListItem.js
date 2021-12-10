import React, { Component } from "react";

export default class ListItem extends Component{
state = {

}

removeItem = ()=>{
    console.log('close')
}
render(){

    return(
<div>
    {this.props.valueText}
    <button 
        type="button"
         className="close"
         onClick={this.removeItem}
    >✗</button>
</div>

    )
}
}