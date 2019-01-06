import { Component } from 'react';
import styles from './PhysicianCalendar.css';
import Axios from 'axios';

export default class PhysicianCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            physiciansList: [],
            currentPatients: [],
            cache: {},
            selectedPhysician: '',
        }
    }

    componentDidMount() {
        Axios.get('/calendar/physicians')
        .then(physicianResponse => {
            this.setState({
                physiciansList: physicianResponse.data,
                selectedPhysician: physicianResponse.data[0],
            })
            Axios.get(`/calendar/${physicianResponse.data[0]}`)
            .then(patientResponse => {
                this.setState({currentPatients: patientResponse.data})
                this.state.cache[physicianResponse.data[0]] = patientResponse.data;
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
    }

    getPatientsOnPhysicianClick(physician) {
        const {cache} = this.state;
        this.state.cache[physician] 
        ? this.setState({
            currentPatients: cache[physician],
            selectedPhysician: physician,
          })
        : Axios.get(`/calendar/${physician}`)
        .then(res => {
            this.setState({
                currentPatients: res.data,
                selectedPhysician: physician,
            });
            cache[physician] = res.data;
        })
    }

    render() {
        const {physiciansList, currentPatients, selectedPhysician} = this.state;
        return (
            <div className="CalendarContainer">
                <div className="PhysiciansList"><strong>Physicians</strong>
                    {physiciansList.map(physician => (
                        <div 
                            className="Physician"
                            onClick={() => this.getPatientsOnPhysicianClick(physician)}>
                                {physician}
                        </div>
                    ))}
                </div>
                <div className="PatientList">
                    <div className="SelectedPhysician">{selectedPhysician}</div>
                    <span className="PatientData">#</span>
                    <span className="PatientData">name</span>
                    <span className="PatientData">time</span>
                    <span className="PatientData">type</span>
                    {currentPatients.map(({name, time, type}, index) => (
                        <div>
                            <span className="PatientData">{index + 1}</span>
                            <span className="PatientData">{name}</span>
                            <span className="PatientData">{time}</span>
                            <span className="PatientData">{type}</span>
                        </div>
                    ))}
                </div>
            </div>
        )       
    }
}
