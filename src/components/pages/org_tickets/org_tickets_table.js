import React from 'react'
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
            ticketStatus: "",
            ticketCreatedAt: ""
        })
    }   

    render() {

        let columns = [
            {Header:'Ticket ID', accessor:'id', width:100},
            {Header:'Subject', accessor:'subject'},
            {Header:'Requester', accessor:'requester_email'},
            {Header:'Creation Date', accessor:'created_at'}
        ];
        
        if (this.state.showTicketDetails === true) {
            return (<TicketDetails 
                id={this.state.ticketDetailID}
                subject={this.state.ticketDetailSubject}
                requester_email = {this.state.ticketDetailRequester}
                organization_name = {this.state.organizationName}
                created_at = {this.state.ticketCreatedAt}
                status = {this.state.ticketStatus}
                navigateBack = {this.navigateBack.bind(this)}/>)
        } 
        
        
        if (this.props.currentOrg !== "" && this.state.showTicketDetails === false) {
            return (

                <div align="center">
                <br/>
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
                        defaultPageSize={20}
                        minRows={1}
                    />
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
