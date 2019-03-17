import React from 'react';
import Row from './Row.jsx';
import AddProperty from './AddProperty.jsx';
import $ from 'jquery';
import {TsTr, TsTbl, TsTh,AddRow, AddRowText} from '../../styles.js';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddFields: false,
      checked: false,
      properties: [
        // {
        //   name: '800 Great St',
        //   available: true,
        //   capacity: 5
        // },
        // {
        //   name: '23 Palmore Way',
        //   available: false,
        //   capacity: 3,
        // }
      ]
    };
    this.addRow = this.addRow.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.concatRow = this.concatRow.bind(this);
    this.getProperties = this.getProperties.bind(this);
  }

  componentDidMount() {
    this.getProperties();
  }

  getProperties() {
    console.log('ran...')
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
          name: obj.name,
          available: obj.available,
          capacity: obj.capacity
        }
      )
    })
  }


  render() {
    return(
      <div>
        <TsTbl>
          <tbody>
            <TsTr>
              <TsTh>Property</TsTh>
              <TsTh>Available</TsTh>
              <TsTh>Capacity</TsTh>
            </TsTr>
            {
              this.state.properties.map((row, i) => {
                return <Row name={row.name} available={row.available} capacity={row.capacity} key={i} rowId={i}/>
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
    )
  }
}

export default Table;