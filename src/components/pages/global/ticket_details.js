import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from 'react-table'
let config = require('../../../config/config.js')

export default class TicketDetails extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            ticketComments: ""
        }
    } 

    getTicketComments() {

        let _this = this

        var request_params = {
            url: config.API() + '/getTicketComments/' + this.props.id
        }

        axios(request_params)
        .then(function(response){
            _this.setState({ticketComments: response.data})
        })
        .catch(function (error){
            _this.setState({ticketComments: "Error getting ticket details"})
        })
    }

    render() {

        if (this.state.ticketComments === "" ) {
            this.getTicketComments()

            if (this.props.ticketType === "refresh") {
                return (
                    <div>
                        <button onClick={this.props.navigateBack}>Back</button>
                        <br/><br/>
                        <strong>Ticket ID:</strong> {this.props.id}
                        <br/>
                        <strong>Subject:</strong> {this.props.subject}
                        <br/>
                        <strong>Requester:</strong> {this.props.requester_email}
                        <br/>
                        <strong>Organization:</strong> {this.props.organization_name}
                        <br/>
                        <strong>Patient Count:</strong> {this.props.patient_count}
                        <br/>
                        <strong>Refresh Date:</strong> {this.props.refresh_date}
                        <br/><br/>
                        <h2 align="center">Loading ticket details...</h2>
                    </div>  
                )
            } else {
                return (
                    <div>
                        <button onClick={this.props.navigateBack}>Back</button>
                        <br/><br/>
                        <strong>Ticket ID:</strong> {this.props.id}
                        <br/>
                        <strong>Subject:</strong> {this.props.subject}
                        <br/>
                        <strong>Requester:</strong> {this.props.requester_email}
                        <br/>
                        <strong>Organization:</strong> {this.props.organization_name}
                        <br/>
                        <h2 align="center">Loading ticket details...</h2>
                    </div>  
                )
            } 
        } else if (this.state.ticketComments === "Error getting ticket details") {
            return(<div>Error getting Ticket details</div>)
        }
        else {
            var columns = [
                {Header:'Author Email', accessor:'author_email', width:250},
                {Header:'Public?', accessor:'public', width:75},
                {Header:'Comment', accessor:'body', style:{'whiteSpace': 'pre-wrap'}},
                {Header:'Date', accessor:'created_at', width:250}
            ]

            if (this.props.ticketType === "refresh"){
                return(
                    <div>
                        <button onClick={this.props.navigateBack}>Back</button>
                        <br/><br/>
                        <strong>Ticket ID:</strong> {this.props.id}
                        <br/>
                        <strong>Subject:</strong> {this.props.subject}
                        <br/>
                        <strong>Requester:</strong> {this.props.requester_email}
                        <br/>
                        <strong>Organization:</strong> {this.props.organization_name}
                        <br/>
                        <strong>Patient Count:</strong> {this.props.patient_count}
                        <br/>
                        <strong>Refresh Date:</strong> {this.props.refresh_date}
                        <br/>
                        <br/>
                        <ReactTable 
                        data={this.state.ticketComments}
                        columns={columns} 
                        className="-striped -highlight"
                        defaultPageSize={10}/>
                    </div>
                )

            } else {
                return(
                    <div>
                        <button onClick={this.props.navigateBack}>Back</button>
                        <br/><br/>
                        <strong>Ticket ID:</strong> {this.props.id}
                        <br/>
                        <strong>Subject:</strong> {this.props.subject}
                        <br/>
                        <strong>Requester:</strong> {this.props.requester_email}
                        <br/>
                        <strong>Organization:</strong> {this.props.organization_name}
                        <br/>
                        <br/>
                        <ReactTable 
                        data={this.state.ticketComments}
                        columns={columns} 
                        className="-striped -highlight"
                        defaultPageSize={10}/>
                    </div>
                )
            }
        }
    }
}