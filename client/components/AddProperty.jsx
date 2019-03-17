import React from 'react';
import { CreateProperty, SaveRow, CancelSaveRow } from '../../styles';
import Switch from "react-switch";

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: false,
      name: "",
      capacity: "",
      savedCapacity: "",
      savedName: "",
      savedChecked: false
      
    }
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.editField = this.editField.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
  }

  toggleSwitch(available) {
    this.setState({
      available: !this.state.available
    })
  }

  editField(e) {
    console.log(e.target.id)
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  saveProperty() {
    this.setState({
      savedName: this.state.name,
      savedChecked: this.state.available,
      savedCapacity: this.state.capacity,
    })
    this.props.concatRow({
      name: this.state.name, 
      available: this.state.available,
      capacity: this.state.capacity,
    })
    this.state.name = '';
    this.state.capacity = '';
    this.state.available = false;
    this.props.closeForm();
  }

  render() {
    return (
      <CreateProperty>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"start"}}>
          <label>Name:</label> 
            <input id='name' onChange={this.editField} value={this.state.name} style={{width: "20%", fontFamily: "Trebuchet MS", height: "30px", fontSize: "16px"}}></input>
          <label style={{marginTop:"18px", marginBottom:"8x"}}>Available?</label>
          <div style={{marginBottom: "8px"}}>
            <Switch style={{display:"none"}} onChange={this.toggleSwitch} checked={this.state.available}/>
          </div>
          <label>Capacity:</label>
          <div>
            <input id='capacity' onChange={this.editField} value={this.state.capacity} style={{width: "20%", fontFamily: "Trebuchet MS", height: "30px", fontSize: "16px"}}></input>
          </div>
          <div style={{marginTop:"18px"}}>
            <CancelSaveRow onClick={this.props.closeForm}>Cancel</CancelSaveRow>
            <SaveRow onClick={this.saveProperty}>Save</SaveRow>
          </div>
        </div>
      </CreateProperty>
    )
  }
}

export default AddProperty;