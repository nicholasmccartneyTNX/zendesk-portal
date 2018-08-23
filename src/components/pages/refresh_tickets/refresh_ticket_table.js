import React from 'react'
import RefreshChart from './refresh_chart'
import TicketDetails from '../global/ticket_details'
import axios from 'axios'
import ReactTable from 'react-table'
let config = require('../../../config/config')

export default class HCOTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            organizationName: "",            
            ticketDetailID: "",
            ticketDetailSubject: "",
            ticketDetailRequester: "",
            ticketPatientCount: "",
            ticketRefreshDate: "",
            ticketStatus: "",
            ticketCreatedAt: "",
            showTicketDetails: false,
            showChart: true
        }
    }

    onRowClick = (state, rowInfo, column, instance) => {
        let _this = this
        return {
            onClick: e => {
               _this.setState({ticketDetailID: rowInfo.original.id})
               _this.setState({organizationName: rowInfo.original.organization_name})
               _this.setState({ticketDetailRequester: rowInfo.original.requester_email})
               _this.setState({ticketDetailSubject: rowInfo.original.subject})
               _this.setState({ticketPatientCount: rowInfo.original.patient_count})
               _this.setState({ticketRefreshDate: rowInfo.original.refresh_date})
               _this.setState({ticketStatus: rowInfo.original.status})
               _this.setState({ticketCreatedAt: rowInfo.original.created_at})
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
            organizationName: "",
            ticketPatientCount: "",
            ticketRefreshDate: "",
            ticketStatus: "",
            ticketCreatedAt: ""
        })
    }   

    render() {

        let columns = [
            {Header:'Ticket ID', accessor:'id', width:100},
            {Header:'Patient Count', accessor:'patient_count'},
            {Header:'Refresh Date', accessor:'refresh_date'},
            {Header:'Refresh Status', accessor:'status'},
            {Header:'Creation Date', accessor:'created_at'}
        ];
        
        if (this.state.showTicketDetails === true) {
            return (<TicketDetails 
                id={this.state.ticketDetailID}
                subject={this.state.ticketDetailSubject}
                requester_email={this.state.ticketDetailRequester}
                organization_name={this.state.organizationName}
                patient_count={this.state.ticketPatientCount}
                refresh_date={this.state.ticketRefreshDate}
                created_at = {this.state.ticketCreatedAt}
                status = {this.state.ticketStatus}
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
                        className="-striped -highlight"
                        defaultPageSize={7}
                        minRows={1}
                    />
                    <div align="center">
                        <RefreshChart tickets={this.props.tickets} name={this.props.currentOrg}/> 
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
