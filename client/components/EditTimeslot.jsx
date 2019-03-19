import React from 'react';
import $ from 'jquery'
import { TsTbl, TsTh, TsTr, AddRowText, AddRowCenter, TsTd, Return} from '../../styles';
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
      display: this.props.display,
      edittingTimeslot: false,
      selectedTimeslot: '',
      propertyId: '',
      enteredStart: '',
      enteredEnd: '',
      savedStart: '',
      savedEnd: '',
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
    this.enterTimeslot = this.enterTimeslot.bind(this);
    this.saveTimes = this.saveTimes.bind(this);
    this.postTime = this.postTime.bind(this);
    this.openModalAddItem = this.openModalAddItem.bind(this);
    this.updateTimeslot = this.updateTimeslot.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.sortTimes(newProps.propertyTimes)
    this.setState({
      propertyId: newProps.property['_id'],
      display: newProps.display
    })
  }

  openModalAddItem(e) {
    this.setState({
      targetDay: e.target.id,
      modalIsOpen: true
    })
  }

  openModal(e) {
    var day = e.target.parentElement.id.split(',')[0].toLowerCase();
    var index = e.target.parentElement.id.split(',')[1];
    var selectedTimeslot = this.state[`${day}Slots`][index];
    console.log(selectedTimeslot);
    this.setState({
      edittingTimeslot: true,
      modalIsOpen: true,
      selectedTimeslot: selectedTimeslot,
      enteredStart: selectedTimeslot === '' ? '' : selectedTimeslot.start,
      enteredEnd: selectedTimeslot === '' ? '' : selectedTimeslot.end,
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedTimeslot: '',
      enteredStart: '',
      enteredEnd: '',
      edittingTimeslot: false
    });
  }

  enterTimeslot(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  saveTimes() {
    var newPreparedObject = {
      propertyId: this.state.propertyId,
      start: this.state.enteredStart,
      end: this.state.enteredEnd,
      day: this.state.targetDay
    }
    this.setState({
      preparedObject: newPreparedObject
    },
      this.state.edittingTimeslot ? this.updateTimeslot() :  this.postTime(newPreparedObject)
    )
    this.props.getTimes(/*newPreparedObject.propertyId*/this.state.propertyId)
    this.closeModal();
  }

  updateTimeslot() {
    var updatedStart = this.state.enteredStart;
    var updatedEnd = this.state.enteredEnd;
    var timeslotId = this.state.selectedTimeslot['_id'];
    $.ajax({
      method: "PUT",
      url: `/api/reservation_times/`,
      data: JSON.stringify({id: timeslotId, start: updatedStart, end: updatedEnd}),
      success: () => {
        this.setState({
          edittingTimeslot: false,
        })
        console.log('UPDATED TIME!')
      },
      contentType: 'application/json'
    });
  }

  postTime(objToSave) {
    $.ajax({
      method: "POST",
      url: `/api/reservation_times/`,
      data: JSON.stringify(objToSave),
      success: () => {
        this.setState({
          edittingTimeslot: false
        })
        console.log('SAVED TIME!')
      },
      contentType: 'application/json'
    });
  }

  deleteTime() {
    var timeslotId = this.state.selectedTimeslot['_id'];
    $.ajax({
      method: "DELETE",
      url: `/api/reservation_times/`,
      data: JSON.stringify({id: timeslotId}),
      success: () => {
        this.setState({
          edittingTimeslot: false
        })
        this.closeModal()
        this.props.getTimes(this.state.propertyId)
        console.log('DELETED TIME!')
      },
      contentType: 'application/json'
    });
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
      <div style={this.state.display ? {display:'block'} : {display: 'none'}}>
        <h1>{`Edit available timeslots for ${this.props.property.name}`}</h1>
        <div style={{display:'flex', flexDirection:'row'}}>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Sunday</TsTh></TsTr>
              {this.state.sundaySlots.map((sundaySlots, i) => {
                return <TsTr id={['Sunday', i]} onClick={this.openModal}><TsTd>{`${sundaySlots.start} - ${sundaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Sunday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Monday</TsTh></TsTr>
              {this.state.mondaySlots.map((mondaySlots, i) => {
                return <TsTr id={['Monday', i]} onClick={this.openModal}><TsTd>{`${mondaySlots.start} - ${mondaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Monday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Tuesday</TsTh></TsTr>
              {this.state.tuesdaySlots.map((tuesdaySlots, i) => {
                return <TsTr id={['Tuesday', i]} onClick={this.openModal}><TsTd>{`${tuesdaySlots.start} - ${tuesdaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Tuesday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Wednesday</TsTh></TsTr>
              {this.state.wednesdaySlots.map((wednesdaySlots, i) => {
                return <TsTr id={['Wednesday', i]} onClick={this.openModal}><TsTd>{`${wednesdaySlots.start} - ${wednesdaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Wednesday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Thursday</TsTh></TsTr>
              {this.state.thursdaySlots.map((thursdaySlots, i) => {
                return <TsTr id={['Thursday', i]} onClick={this.openModal}><TsTd>{`${thursdaySlots.start} - ${thursdaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Thursday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Friday</TsTh></TsTr>
              {this.state.fridaySlots.map((fridaySlots, i) => {
                return <TsTr id={['Friday', i]} onClick={this.openModal}><TsTd>{`${fridaySlots.start} - ${fridaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Friday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
          <TsTbl>
            <tbody>
              <TsTr><TsTh>Saturday</TsTh></TsTr>
              {this.state.saturdaySlots.map((saturdaySlots, i) => {
                return <TsTr id={['Saturday', i]} onClick={this.openModal}><TsTd>{`${saturdaySlots.start} - ${saturdaySlots.end}`}</TsTd></TsTr>
              })}
             <tr><AddRowCenter><AddRowText id='Saturday' onClick={this.openModalAddItem}>+ Time</AddRowText></AddRowCenter></tr>
            </tbody>
          </TsTbl>
        </div>
        <Return onClick={this.props.returnBtn}>Return</Return>
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
            <input id='enteredStart' value={this.state.enteredStart} onChange={this.enterTimeslot}/>
            <div style={{marginTop: '3px', marginRight: '3px'}}>End Time:</div>
            <input id='enteredEnd' value={this.state.enteredEnd} onChange={this.enterTimeslot}/>
          </form>
          <button style={{marginRight: '3px'}} onClick={this.saveTimes}>Save</button>
          <button style={{marginRight: '3px'}} onClick={this.closeModal}>Close</button>
          <button style={{color:'red', marginRight: '3px'}} onClick={this.deleteTime}>Delete</button>
        </Modal>
      </div>
    )
  }
}

export default EditTimeslot;