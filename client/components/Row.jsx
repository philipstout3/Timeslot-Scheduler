import React from 'react';
import Switch from "react-switch";
import $ from 'jquery';
import {TsTr, TsTd, EditRow, SaveRow, CancelSaveRow, AddRow, AddRowText, DeleteRow, EditTimeslots} from '../../styles.js'

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
    this.updateProperty = this.updateProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.editTimes = this.editTimes.bind(this);
  }

  toggleEdit(e) {
    this.setState({
      edit: !this.state.edit,
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
    this.updateProperty();
  }

  updateProperty() {
    $.ajax({
      method: "PUT",
      url: '/api/reservation_items',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({id: this.props.rowId, name: this.state.name, available: this.state.checked, capacity: this.state.capacity}),
      success: (data) => {
        console.log('updated data:', data)
      },
    });
  }

  cancelSave() {
    this.setState({
      edit: false
    })
  }

  deleteProperty() {
    this.props.deleteRow(this.props.rowId);
  }

  editTimes() {
    this.props.editTimeslot(this.props.rowId)
  }

  render() {
    return (
      this.state.edit ? 
      <TsTr>
        <TsTd style={{width: "30%"}}>
          <EditRow id='name' type='text' value={this.state.name} onChange={this.editValues}/>
        </TsTd>
        <TsTd>
          <Switch onChange={this.toggleSwitch} checked={this.state.checked}/>
        </TsTd>
        <TsTd>
        <EditRow id='capacity' type='text' value={this.state.capacity} onChange={this.editValues}/>
        </TsTd>
        <td>
          <CancelSaveRow onClick={this.cancelSave}>Cancel</CancelSaveRow>
          <SaveRow onClick={this.saveValues}>Save</SaveRow>
          <EditTimeslots onClick={this.editTimes}>Edit Timeslots</EditTimeslots>
          <DeleteRow onClick={this.deleteProperty}>Delete</DeleteRow>
        </td>
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