import React from 'react'
import axios from 'axios'
import '../../../../node_modules/react-table/react-table.css'
import ReactTable from 'react-table'
import TicketDetails from '../global/ticket_details'
let config = require('../../../config/config.js')

export default class Layout extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            dqTickets_JSON: "",
            showTicketDetails: false,
            ticketDetailID: "",
            ticketDetailSubject: "",
            ticketDetailRequester: "",
            ticketDetailOrganization: ""
        }

        this.onRowClick = this.onRowClick.bind(this)
        this.navigateBack = this.navigateBack.bind(this)
    }

    getDQTickets() {
        let _this = this

        var request_params = {
            url: config.API() + '/getDQTickets'
        }

        axios(request_params)
        .then(function(response){
            _this.setState({dqTickets_JSON: response.data})
        })
        .catch(function (error){
            _this.setState({dqTickets_JSON: "Error"})
        })
    }

     onRowClick = (state, rowInfo, column, instance) => {
        let _this = this
        return {
            onClick: e => {
               _this.setState({ticketDetailID: rowInfo.original.id})
               _this.setState({ticketDetailSubject: rowInfo.original.subject})
               _this.setState({ticketDetailRequester: rowInfo.original.requester_email})
               _this.setState({ticketDetailOrganization: rowInfo.original.organization_name})
               _this.setState({showTicketDetails: true})
            }
        }
    }

    navigateBack(){
        this.setState({
            showTicketDetails: false,
            ticketDetailID: "",
            ticketDetailSubject: "",
            ticketDetailRequester: "",
            ticketDetailOrganization: ""
        })
    }

    render() {


        if (this.state.dqTickets_JSON === "" ) {
            this.getDQTickets()
            return (<h2 align="center">Loading table data...</h2>)
        } else if (this.state.dqTickets_JSON === "Error") {
            return(<div>Error getting Data Quality tickets</div>)
        }
        else if (this.state.dqTickets_JSON != "Error" & this.state.dqTickets_JSON != "" & this.state.showTicketDetails === true)  {
            return (<TicketDetails 
                id={this.state.ticketDetailID}
                subject={this.state.ticketDetailSubject}
                requester_email={this.state.ticketDetailRequester}
                organization_name={this.state.ticketDetailOrganization}
                navigateBack = {this.navigateBack.bind(this)}/>)
        }
        else {
            var columns = [
                {Header:'Ticket ID', accessor:'id', width:100},
                {Header:'Subject', accessor:'subject'},
                {Header:'Requester', accessor:'requester_email'},
                {Header:'Organization', accessor:'organization_name'},
                {
                    Header:'Status', 
                    accessor:'status',
                    width:150,
                    filterMethod: (filter, row) => {
                        if (filter.value === 'all') {
                          return true;
                        }
                        if (filter.value === 'open') {
                          return row[filter.id] === 'open';
                        }
                        if (filter.value === 'pending') {
                            return row[filter.id] === 'pending';
    
                        }
                        if (filter.value === 'hold') {
                            return row[filter.id] === 'hold';
                        }
                        if (filter.value === 'closed') {
                            return row[filter.id] === 'closed';
                        }
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : 'all'}
                        >
                          <option value='all'>All</option>
                          <option value='open'>Open</option>
                          <option value='pending'>Pending</option>
                          <option value='hold'>Hold</option>
                          <option value='closed'>Closed</option>
                        </select>
                    }
                ];

            return(<ReactTable 
                data={this.state.dqTickets_JSON} 
                columns={columns} 
                filterable
                getTdProps={this.onRowClick}
                className="-striped -highlight"/>)
        }  
            

    }

}