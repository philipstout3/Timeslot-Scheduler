import React from 'react';
import Row from './Row.jsx';
import AddProperty from './AddProperty.jsx';
import $ from 'jquery';
import {TsTr, TsTbl, TsTh,AddRow, AddRowText} from '../../styles.js';
import EditTimeslot from './EditTimeslot.jsx';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTimeslot: false,
      propertyToEdit: '',
      propertyTimes: '',
      displayAddFields: false,
      checked: false,
      properties: []
    };
    this.addRow = this.addRow.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.concatRow = this.concatRow.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editTimeslot = this.editTimeslot.bind(this);
    this.getProperty = this.getProperty.bind(this);
    this.getTimes = this.getTimes.bind(this);
  }

  componentDidMount() {
    this.getProperties();
  }

  getProperties() {
    $.ajax({
      method: "GET",
      url: '/api/reservation_items',
      success: (data) => {
        console.log('data:', data)
        this.setState({
          properties: this.state.properties.concat(data)
        })
      },
      contentType: 'application/json'
    });
  }

  addRow() {
    this.setState({
      displayAddFields: true
    })
  }

  closeForm() {
    this.setState({
      displayAddFields: false
    })
  }

  concatRow(obj) {
    this.setState({
      properties: this.state.properties.concat(
        {
          _id: obj._id,
          name: obj.name,
          available: obj.available,
          capacity: obj.capacity
        }
      )
    })
  }

  deleteRow(rowId) {
    $.ajax({
      method: "DELETE",
      url: '/api/reservation_items',
      //dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({id: rowId}),
      success: () => {
        this.setState({
          properties: []
        })
        this.getProperties()
      }
    });
  }

  editTimeslot(rowId) {
    this.setState({
      editTimeslot: true,
    })
    this.getProperty(rowId)
  }

  getProperty(propertyId) {
    $.ajax({
      method: "GET",
      url: `/api/reservation_item/${propertyId}`,
      success: (data) => {
        this.getTimes(propertyId);
        this.setState({
          propertyToEdit: data[0],
        })
      },
      contentType: 'application/json'
    });
  }

  getTimes(propertyId) {
    $.ajax({
      method: "GET",
      url: `/api/reservation_times/${propertyId}`,
      success: (data) => {
        this.setState({
          propertyTimes: data,
        })
      },
      contentType: 'application/json'
    });
  }


  render() {
    return(
      <div>
        <div style={this.state.editTimeslot ? {display:'none'} : {dispaly:{}} }>
          <TsTbl>
            <tbody>
              <TsTr>
                <TsTh>Property</TsTh>
                <TsTh>Available</TsTh>
                <TsTh>Capacity</TsTh>
              </TsTr>
              {
                this.state.properties.map((row, i) => {
                  return <Row name={row.name} available={row.available} capacity={row.capacity} key={i} rowId={row._id} deleteRow={this.deleteRow} editTimeslot={this.editTimeslot}/>
                })
              }
              <tr>
                <td></td>
                <td></td>
                <AddRow><AddRowText onClick={this.addRow}>Add Property</AddRowText></AddRow>
              </tr>
              </tbody>
          </TsTbl>
          <div style={this.state.displayAddFields ? {display: "block"} : {display: "none"}}>
            <AddProperty closeForm={this.closeForm} concatRow={this.concatRow}/>
          </div>
        </div>
          <EditTimeslot property={this.state.propertyToEdit} display={this.state.editTimeslot} propertyTimes={this.state.propertyTimes}/>
      </div>
    )
  }
}

export default Table;