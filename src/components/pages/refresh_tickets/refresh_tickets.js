import React from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import '../../../../node_modules/react-table/react-table.css'
import '../refresh_tickets/refresh_tickets.css'
import TicketDetails from '../global/ticket_details'
import {LineChart} from 'react-easy-chart'
let config = require('../../../config/config.js')


export default class Page extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            orgs_JSON: "",
            organizationName: "",
            headerTitle: this.props.title,
            showMenu: false,
        }        
    }   

    updateHCOs() {               
        let _this = this;
        var request_params = {
            url: config.API() + '/HCOs'
        }
        axios(request_params)
        .then(function(response){
            const sortedOrgs = [].concat(response.data)
            .sort(function(a, b) { 
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();

                if(nameA < nameB) {
                    return -1
                }
                if(nameA > nameB) {
                    return 1
                }

                return 0                
            });
            _this.setState({orgs_JSON: sortedOrgs})
        })
        .catch(function (error){
            _this.setState({orgs_JSON: "Error"})
        })
    }

    render() {

        if (this.state.orgs_JSON === "") {
            this.updateHCOs();
            return(
                <h3 align="center">Loading HCOs...</h3>               
            )
        } else if (this.state.orgs_JSON === "Error"){
            return (
                <h3 align="center">Error. Cannot display organizations.</h3>
            )
        } else if (this.state.orgs_JSON !== ""){
            if (this.state.orgs_JSON !== "Error") {
                return (
                    <div>
                        <br/>
                        <HCODropdown orgs={this.state.orgs_JSON}/>                        
                    </div>
                )
            }
        } else {
            return <h3 align="center">Error in IF ELSE</h3>
        }
         
    }
}

class HCODropdown extends Page {

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
                    _this.setState({orgRefreshDate: this.props.orgs[i]['organization_fields']['latest_refresh_date'].substring(0, 10)})
                } else {
                    _this.setState({orgRefreshDate: ""})
                }

                if (this.props.orgs[i]['organization_fields']['patient_count'] !== null) {
                    _this.setState({orgPatientCount: this.props.orgs[i]['organization_fields']['patient_count'].toLocaleString()})
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
                    <h3>Loading Tickets...</h3>
                </div>
            )
        } else if (this.state.orgRefreshTickets !== "") {
            return (
                <div>
                    <div align="center">
                    <select className="flex-dropdown" id="orgSelection" name="org" onChange={this.chooseOrg} value={this.state.organizationName} align="center">
                        {this.HCODropdown()}               
                    </select>
                    <h5>{"Lastest Refresh: " + this.state.orgRefreshDate + " || Patients: " + this.state.orgPatientCount}</h5>
                    </div>
                    {console.log(this.state.orgRefreshTickets)}
                    <HCOTable currentOrg={this.state.organizationName} tickets={this.state.orgRefreshTickets}/>                    
                </div>
            )
        } else {
            return (
                <h3>Nothing to see here</h3>
            )
        }
    
    }
}

class HCOTable extends Page {

    constructor(props) {
        super(props)
        this.state = {
            organizationName: "",            
            ticketDetailID: "",
            ticketDetailSubject: "",
            ticketPatientCount: "",
            ticketRefreshDate: "",
            showTicketDetails: false,
            showChart: true
        }
    }

    onRowClick = (state, rowInfo, column, instance) => {
        let _this = this
        return {
            onClick: e => {
               _this.setState({ticketDetailID: rowInfo.original.id})
               _this.setState({ticketDetailSubject: rowInfo.original.subject})
               _this.setState({ticketDetailRequester: rowInfo.original.requester_email})
               _this.setState({organizationName: rowInfo.original.organization_name})
               _this.setState({ticketPatientCount: rowInfo.original.patient_count})
               _this.setState({ticketRefreshDate: rowInfo.original.refresh_date})
               _this.setState({showTicketDetails: true})
               _this.setState({showChart: false})
            }
        }
    }

    navigateBack(){
        this.setState({
            showTicketDetails: false,
            showChart: true,
            ticketDetailID: "",
            ticketDetailSubject: "",
            ticketDetailRequester: "",
            organizationName: "",
            ticketPatientCount: "",
            ticketRefreshDate: ""
        })
    }
    
    

    render() {
        let columns = [
            {Header:'Ticket ID', accessor:'id', width:100},
            {Header:'Subject', accessor:'subject'},
            {Header:'Patient Count', accessor:'patient_count'},
            {Header:'Refresh Date', accessor:'refresh_date'},
            {Header:'Requester', accessor:'requester_email'}
        ];
        
        if (this.state.showTicketDetails === true) {
            return (<TicketDetails 
                id={this.state.ticketDetailID}
                subject={this.state.ticketDetailSubject}
                requester_email={this.state.ticketDetailRequester}
                organization_name={this.state.organizationName}
                patient_count={this.state.ticketPatientCount}
                refresh_date={this.state.ticketRefreshDate}
                navigateBack = {this.navigateBack.bind(this)}
                ticketType = {"refresh"}/>)
        } 
        
        
        if (this.props.currentOrg !== "" && this.state.showTicketDetails === false && this.state.showChart === true) {
            return (

                <div align="center">
                    <ReactTable
                        data={this.props.tickets}
                        columns={columns}
                        defaultSorted={[
                            {
                              id: "id",
                              desc: true
                            }
                          ]}
                        getTdProps={this.onRowClick}
                        className="-highlight"
                        defaultPageSize={7}
                    />
                    <div align="center">
                        <HCOChart tickets={this.props.tickets} name={this.props.currentOrg}/> 
                    </div>

                </div>
            )           
        } else if (this.props.currentOrg === ""){
            return (
                <h3>No Org Selected</h3>
            )
        } else {
            return <h3>Unknown Error</h3>
        }
    }        
}

class HCOChart extends Page {

    constructor(props){
        super(props)
    
        this.state={

        }
    }

    getRefreshData() {
        let data = []
        let refresh = {}
        let tickets = this.props.tickets

        for(let i = tickets.length - 1; i > -1; i --) {

            if(tickets[i].refresh_date !== "" && tickets[i].patient_count !== ""){
                refresh = { x: tickets[i].refresh_date, y: parseInt(tickets[i].patient_count)}
                data.push(refresh)
            }
        }
        return data
    }

    render() {
        return (
            <div>
                <h4>{this.props.name + " Refresh History"}</h4>
                <LineChart
                    xType={'text'}
                    margin={{top:50, right:50, bottom:50, left:100}}
                    height={400}
                    width={1000}
                    yTicks={5}
                    interpolate='cardinal'
                    lineColors={['red']}
                    dataPoints
                    axes
                    axisLabels={{x: "Refresh Date", y: "Patient Count"}}        
                    style={{ '.label': { fill: 'black', } }}          
                    data={[
                        this.getRefreshData()
                      ]}
                />
            </div>
        )
    }
}

        
    
