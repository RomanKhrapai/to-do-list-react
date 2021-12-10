import React,{ Component} from "react";
import './style.css'

export default class List extends Component{   

    checkedItem = (checked)=>{
         return checked? '"list__item list__item--checked"':'"list__item"';
    }
    
     render(){
         const listItem = this.props.items.map(item => 
            <li 
                key = {item.id} 
                className={item.checked? "list__item list__item--checked":"list__item"} 
                onClick={this.props.onItemClick.bind(undefined,item.id)}
            >       
                {item.value}
                <button 
                    type="button"
                    className="list__btn-close"
                    onClickCapture={this.props.onButtonClick.bind(undefined,item.id)}
                >✗</button>
            </li>        
        )

        return(       
            <ul className="list">
                {listItem}
                </ul>        
        )
    }
}