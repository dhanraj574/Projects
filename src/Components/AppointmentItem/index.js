import './index.css'

const AppointmentItem = props => {
  const {title, date, clickStarred, starred, id, each} = props

  const starredAppointment = () => {
    clickStarred(id)
  }

  const isstarred = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="Appointment-item">
      <div className="appointment-titlecont">
        <p className="appointment-title">{title}</p>
        <button
          className="star-btn"
          type="button"
          onClick={starredAppointment}
          data-testid="star"
        >
          <img className="starred-img" src={isstarred} alt="star" />
        </button>
      </div>
      <p className="appointment-date">Date:{date}</p>
    </li>
  )
}
export default AppointmentItem
