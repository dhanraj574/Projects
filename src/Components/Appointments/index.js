import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    starredAppointments: [],
    titleName: '',
    appointmentDate: '',
    starredbtnClicked: false,
  }

  onChangetitle = event => {
    this.setState({titleName: event.target.value})
  }

  onChangedate = event => {
    this.setState({
      appointmentDate: event.target.value,
    })
  }

  addAppointment = event => {
    const {titleName, appointmentDate, appointmentList} = this.state
    event.preventDefault()
    const splitdate = appointmentDate.split('-')
    const newDate = splitdate.join(',')
    if (titleName !== '' && appointmentDate !== '') {
      const newapppointment = {
        id: uuidv4(),
        title: titleName,
        date: format(new Date(newDate), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newapppointment],
        titleName: '',
        appointmentDate: '',
      }))
    }
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  filteredAppointments = () => {
    const {appointmentList, starredbtnClicked} = this.state
    if (starredbtnClicked) {
      return appointmentList.filter(
        eachappointment => eachappointment.isStarred == true,
      )
    }
    return appointmentList
  }

  showStarredAppointments = () => {
    const {starredbtnClicked} = this.state
    this.setState({starredbtnClicked: !starredbtnClicked})
  }

  render() {
    const {titleName, appointmentDate, appointmentList, starredbtnClicked} =
      this.state
    const filteredAppointmentsList = this.filteredAppointments()
    const starredbtn = starredbtnClicked ? 'starred-btn-2' : 'starred-btn-1'
    return (
      <div className="appointments-app">
        <div className="appointments-card">
          <div className="inputs-section">
            <form className="inputs-cont" onSubmit={this.addAppointment}>
              <h1 className="addappointment-heading">Add Appointment</h1>
              <label className="title" htmlFor="title">
                TITLE
              </label>
              <input
                id="title"
                className="title-input"
                type="text"
                placeholder="Title"
                value={titleName}
                onChange={this.onChangetitle}
              />
              <label className="date" htmlFor="date">
                DATE
              </label>
              <input
                id="date"
                className="date-input"
                type="date"
                placeholder="dd/mm/yyyy"
                value={appointmentDate}
                onChange={this.onChangedate}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div className="img-cont">
              <img
                className="img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="appointments-cont">
            <div className="appointments-topsection">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={starredbtn}
                onClick={this.showStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-listcont">
              {filteredAppointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  id={each.id}
                  title={each.title}
                  date={each.date}
                  starred={each.isStarred}
                  clickStarred={this.onClickStar}
                  each={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments