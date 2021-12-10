import React, { Component } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import List from "./List";
import "./style.css"

function createLocal(){
    const data = JSON.parse(localStorage.getItem('listItems'));
    return data? data : [];
}

class App extends Component {
    state = {
        inputValue:'',
        arrayData: createLocal()
    }

    addBtnClick = ()=>{
        const value = this.state.inputValue.trim();
        const item ={
            id: new Date().getTime(),
            value: value,
            checked: false,
        };

        if(this.errorValue(value)){ return }

        const newArray = this.state.arrayData.concat(item);
        this.saveLocalData(newArray);
        this.rewriteArrayData(newArray);
        this.cleanInput();   

        Notify.success('value added successfully');
    }

    errorValue = (value)=>{
        if(value===""){
            Notify.failure('value = NAN');
            return true  
        }  
        if(createLocal().findIndex(item=>item.value===value)!==-1){
            Notify.failure("Double value");
            return true
        }
        return false;
    }

    cleanInput = ()=>{
        this.setState({
            inputValue: ''
        })
    }

    hendleChange = (e)=>{
        const value = e.target.value;
        this.setState({
                inputValue: value
            })
    }

    rewriteArrayData = (items) =>{  
        this.setState({
            arrayData: items
        })
    }

    removeArrayDataItem = (id)=>{
        const newArray = createLocal().filter(item=>item.id!==id);
        this.saveLocalData(newArray);
        this.rewriteArrayData(newArray);
    }

    selectItemClick = (id)=>{
        const arrayData = createLocal();
        const item = arrayData.find(item => item.id === +id);
        item.checked = !item.checked;
        this.saveLocalData(arrayData);
        this.rewriteArrayData(arrayData);
    }

    saveLocalData = (items)=>{
        localStorage.setItem('listItems',JSON.stringify(items) )
    }

    render(){
        return(
    <div className="to-do-list">
        <h3 className="to-do-list__title"> to-do-list </h3>
        <div className="to-do-list__box to-do-list__box--flex"> 
            <input className='to-do-list__input'
                value={this.state.inputValue}
                onChange={this.hendleChange}>        
            </input>
            <button className='to-do-list__btn' 
                onClick={this.addBtnClick}>
                    add item
            </button>
        </div>
        <List 
            items = {this.state.arrayData} 
            onButtonClick = {this.removeArrayDataItem.bind(this)}
            onItemClick ={this.selectItemClick.bind(this)}
        />
    </div>
        )
    }
}

export default App