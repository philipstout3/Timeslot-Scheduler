import React from 'react';
import Switch from "react-switch";
import {TsTr, TsTd, EditRow, SaveRow, CancelSaveRow, SliderInput, SliderLabel} from '../../styles.js'

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: this.props.name,
      savedName: this.props.name,
      savedAvailability: this.props.available,
      checked: this.props.available,
      capacity: this.props.capacity,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editValues = this.editValues.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.cancelSave = this.cancelSave.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleEdit(e) {
    this.setState({
      edit: true,
      // targetRow: Number(e.target.parentElement.id)
    })
  }

  toggleSwitch(checked) {
    this.setState({
      checked
    })
  }

  editValues(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  saveValues() {
    this.setState({
      savedName: this.state.name,
      savedAvailability: this.state.available,
      edit: false
    })
  }

  cancelSave() {
    this.setState({
      edit: false
    })
  }

  render() {
    return (
      this.state.edit ? 
      <TsTr>
        <TsTd style={{width: "58%"}}>
          <EditRow id='name' type='text' value={this.state.name} onChange={this.editValues}/>
          <CancelSaveRow onClick={this.cancelSave}>Cancel</CancelSaveRow>
          <SaveRow onClick={this.saveValues}>Save</SaveRow>
        </TsTd>
        <TsTd>
          <Switch onChange={this.toggleSwitch} checked={this.state.checked}/>
        </TsTd>
        <TsTd>
        <EditRow id='capacity' type='text' value={this.state.capacity} onChange={this.editValues}/>
        </TsTd>
      </TsTr>
      :
      <TsTr onClick={this.toggleEdit}>
        <TsTd>
          {this.state.savedName}
        </TsTd>
        <TsTd>
          {this.state.checked ? "Yes" : "No"}
        </TsTd>
        <TsTd>
          {this.state.capacity}
        </TsTd>
      </TsTr>
    )
  }
}

export default Row;