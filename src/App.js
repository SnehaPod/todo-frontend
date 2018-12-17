import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as actions from './store/actions'
import { connect } from 'react-redux'
class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      items: [],
      temp: [],
      singleValue: null,
      isEditable: [false]
    }

    this.addItems = this.addItems.bind(this)

    this.addItemToList = this.addItemToList.bind(this)
  }

  addItems(e){
    this.setState({
      singleValue: e.target.value
    })
  }

  componentDidMount(){
    this.props.getItems()
  }

  addItemToList() {
    let {singleValue, temp} = this.state
    // temp.push(singleValue)
    // var s = document.getElementById('myInput')
    // s.value = null;
    this.props.addItem(singleValue)
    this.props.getItems()
    // this.props.getItems()
    // this.setState({singleValue:null})
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps :', nextProps);
  }

  deleteItem(x,index) {
    let {items} = this.props;
    items.splice(index,1)
    // this.props.addItem(items)
    this.props.deleteItem(x.id)
    this.setState({
      singleValue: null
    })
  }

  editItem(x, index) {
    let {items} = this.props;
    let {isEditable} = this.state
    isEditable[index] = true

    this.setState({
      isEditable
    })
  }

  saveItem(x, index) {
    let {items} = this.props;
    items[index] = x;
    let {singleValue} = this.state;

    // this.props.addItem(items)
    console.log('singleValue :', singleValue);
    console.log('x.title :', document.getElementById(index).innerHTML);
    this.props.editItem(document.getElementById(index).innerHTML, x.id)
    this.setState({
      singleValue: null
    })
  }
  render() {
    let {items} = this.props;
    let {isEditable} = this.state
    return (
      <div className="App">
        <input id="myInput" onChange={(e)=> this.addItems(e)} type="text" placeholder="Todo"/>
        <input onClick={ this.addItemToList } type="submit" value="Add Item"/>
      <div>
        {
         items && items.length > 0 && items.map((x,index)=>{
            return(
              <ul key={index}>
                <li id={index} contentEditable={isEditable[index]}>{x.title}</li>
                {
                  isEditable[index]
                  ?
                 <button onClick={()=>this.saveItem(x, index) }>Save</button>
                 :
                 <button onClick={()=>this.editItem(x, index) }>Edit</button>
                }
                  <button onClick={()=>this.deleteItem(x,index) }>Delete</button>
              </ul>
            )
          })
        }
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  items: state.items
})


export default (
  connect(
    mapStateToProps,
    actions
  )(App)
)
