import React from 'react'
import axios from 'axios'
import RefreshTable from './refresh_ticket_table'
import { BeatLoader } from 'react-spinners';
let config = require('../../../config/config')

export default class HCODropdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            organizationName: "",
            dropdownMade: false,
            orgRefreshTickets: "",
            orgRefreshDate: "",
            orgPatientCount: ""
        }
        this.chooseOrg = this.chooseOrg.bind(this)
    }

    chooseOrg(event) {         
        this.setState({organizationName: event.target.value, dropdownMade: true}, function() {
            this.setState({orgRefreshTickets: ""})
            this.getHCOInfo();
            this.getRRTickets();
        });
    }

    getRRTickets() {
        let _this = this

        var request_params = {
            url: config.API() + '/getRRTickets/' + this.state.organizationName
        }

        axios(request_params)
        .then(function(response){
            _this.setState({orgRefreshTickets: response.data}) 
        })
        .catch(function (error){
            _this.setState({orgRefreshTickets: "Error"})
        })
    }

    getHCOInfo() {
        let _this = this

        var hco = _this.state.organizationName

        for (var i = 0; i < this.props.orgs.length; i ++) {
            if (_this.props.orgs[i].name == hco) {

                if (this.props.orgs[i]['organization_fields']['latest_refresh_date'] !== null){
                    var unfomatted_latest_refresh = new Date(this.props.orgs[i]['organization_fields']['latest_refresh_date'])
                    var options = {}
                    options.timeZone = "UTC"
                    var latest_refresh_date = unfomatted_latest_refresh.toLocaleDateString("en-US",options)
                    _this.setState({orgRefreshDate: latest_refresh_date })
                } else {
                    _this.setState({orgRefreshDate: ""})
                }

                if (this.props.orgs[i]['organization_fields']['patient_count'] !== null) {
                    _this.setState({orgPatientCount: this.props.orgs[i]['organization_fields']['patient_count'].toLocaleString('en')})
                } else {
                    _this.setState({orgPatientCount: ""})
                }
            }
        }
    }

    HCODropdown() {
        let rows = this.props.orgs;
        let reactRows = [];
        let i;
        let _this = this

        //Put the hint in the select menu
        reactRows.push(<option key={"default"} value={"default"} disabled="disabled">{"Select an HCO"}</option>)

        //For each provider, add it as an option to the select menu
        for (i = 0; i < rows.length; i++) {
            let id = rows[i]['id'];
            let name = rows[i]['name'];
            reactRows.push(<option key={id} value={name}>{name}</option>)
        }
        return reactRows;
    }

    render() {

        if (this.state.dropdownMade === false) {
            return (
                <div align="center">
                    <select className="flex-dropdown" id="orgSelection" name="org" onChange={this.chooseOrg} defaultValue={"default"} align="center">
                        {this.HCODropdown()}               
                    </select>  
                </div>
            )
        } else if (this.state.organizationName !== "" && this.state.orgRefreshTickets === "") {
            return(
                <div align="center">
                    <select className="flex-dropdown" id="orgSelection" name="org" onChange={this.chooseOrg} value={this.state.organizationName} align="center">
                        {this.HCODropdown()}               
                    </select>
                    
                    <br/><br/>
                    <BeatLoader
                        color={'#00467F'} 
                        loading={true}
                    />
                    <p class="loading">Loading HCO information</p>  
                </div>
            )
        } else if (this.state.orgRefreshTickets !== "") {
            return (
                <div>
                    <div align="center">
                        <select className="flex-dropdown" id="orgSelection" name="org" onChange={this.chooseOrg} value={this.state.organizationName} align="center">
                            {this.HCODropdown()}               
                        </select>
                        <br/><br/>
                        <strong>Latest Refresh: </strong> {this.state.orgRefreshDate}
                        <br/>
                        <strong>Patients: </strong> {this.state.orgPatientCount}
                        <br/><br/>
                    </div>
                    <RefreshTable currentOrg={this.state.organizationName} tickets={this.state.orgRefreshTickets}/>                    
                </div>
            )
        } else {
            return (
                <h3>Nothing to see here</h3>
            )
        }
    
    }
}