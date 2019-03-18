import React from 'react';
import $ from 'jquery'
import { TsTbl, TsTh, TsTr, AddRowText, AddRowCenter, TsTd} from '../../styles';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class EditTimeslot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sundaySlots: [],
      mondaySlots: [],
      tuesdaySlots: [],
      wednesdaySlots: [],
      thursdaySlots: [],
      fridaySlots: [],
      saturdaySlots: [],
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sortTimes = this.sortTimes.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.sortTimes(newProps.propertyTimes)
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  sortTimes(times) {
    var newSundaySlots = [];
    var newMondaySlots = [];
    var newTuesdaySlots = [];
    var newWednesdaySlots = [];
    var newThursdaySlots = [];
    var newFridaySlots = [];
    var newSaturdaySlots = [];
    for(var i = 0; i < times.length; i++) {
      if(times[i]['day'] === 'Sunday') {
        newSundaySlots.push(times[i])
        console.log('sunday found!')
      }
      if(times[i]['day'] === 'Monday') {
        newMondaySlots.push(times[i])
      }
      if(times[i]['day'] === 'Tuesday') {
        newTuesdaySlots.push(times[i])
      }
      if(times[i]['day'] === 'Wednesday') {
        newWednesdaySlots.push(times[i])
      }
      if(times[i]['day'] === 'Thursday') {
        newThursdaySlots.push(times[i])
      }
      if(times[i]['day'] === 'Friday') {
        newFridaySlots.push(times[i])
      }
      if(times[i]['day'] === 'Saturday') {
        newSaturdaySlots.push(times[i])
      }
    }
    this.setState({
      sundaySlots: newSundaySlots,
      mondaySlots: newMondaySlots,
      tuesdaySlots: newTuesdaySlots,
      wednesdaySlots: newWednesdaySlots,
      thursdaySlots: newThursdaySlots,
      fridaySlots: newFridaySlots,
      saturdaySlots: newSaturdaySlots
    })
  }

  render() {
    return (
      <div style={this.props.display ? {display:'block'} : {display: 'none'}}>
        <h1>{`Edit available timeslots for ${this.props.property.name}`}</h1>
        <TsTbl>
          <tbody>
          <TsTr>
            <TsTh>Sunday</TsTh>
            <TsTh>Monday</TsTh>
            <TsTh>Tuesday</TsTh>
            <TsTh>Wednesday</TsTh>
            <TsTh>Thursday</TsTh>
            <TsTh>Friday</TsTh>
            <TsTh>Saturday</TsTh>
          </TsTr>
          {this.state.sundaySlots.map((sundayTimes) => {
            return <TsTr><TsTd>{`${sundayTimes.start} - ${sundayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
          </TsTr>
          {this.state.mondaySlots.map((mondayTimes) => {
            return <TsTr><TsTd>{`${mondayTimes.start} - ${mondayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
          </TsTr>
          {this.state.tuesdaySlots.map((tuesdayTimes) => {
            return <TsTr><TsTd>{`${tuesdayTimes.start} - ${tuesdayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
          </TsTr>
          {this.state.wednesdaySlots.map((wednesdayTimes) => {
            return <TsTr><TsTd>{`${wednesdayTimes.start} - ${wednesdayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
          </TsTr>
          {this.state.thursdaySlots.map((thursdayTimes) => {
            return <TsTr><TsTd>{`${thursdayTimes.start} - ${thursdayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
          </TsTr>
          {this.state.fridaySlots.map((fridayTimes) => {
            return <TsTr><TsTd>{`${fridayTimes.start} - ${fridayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
          </TsTr>
          {this.state.saturdaySlots.map((saturdayTimes) => {
            return <TsTr><TsTd>{`${saturdayTimes.start} - ${saturdayTimes.end}`}</TsTd></TsTr>
          } )}
          <TsTr>
            <AddRowCenter onClick={this.openModal}><AddRowText>+ Time</AddRowText></AddRowCenter>
            <AddRowCenter><AddRowText>+ Time</AddRowText></AddRowCenter>
            <AddRowCenter><AddRowText>+ Time</AddRowText></AddRowCenter>
            <AddRowCenter><AddRowText>+ Time</AddRowText></AddRowCenter>
            <AddRowCenter><AddRowText>+ Time</AddRowText></AddRowCenter>
            <AddRowCenter><AddRowText>+ Time</AddRowText></AddRowCenter>
            <AddRowCenter><AddRowText>+ Time</AddRowText></AddRowCenter>
          </TsTr>
          </tbody>
        </TsTbl>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Enter Timeslot</h2>
          <form style={{marginBottom: '6px'}}>
            <div style={{marginBottom: '3px', marginRight: '5px'}}>Start Time:</div>
            <input />
            <div style={{marginTop: '3px', marginRight: '3px'}}>End Time:</div>
            <input/>
          </form>
          <button style={{marginRight: '3px'}} onClick={this.closeModal}>Save</button>
          <button style={{marginRight: '3px'}} onClick={this.closeModal}>Close</button>
          <button style={{color:'red', marginRight: '3px'}} onClick={this.closeModal}>Delete</button>
        </Modal>
      </div>
    )
  }
}

export default EditTimeslot;