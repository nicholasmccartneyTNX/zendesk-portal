import React from 'react'
import axios from 'axios'
import HCOTable from './hco_table'
import { BeatLoader } from 'react-spinners';
let config = require('../../../config/config')

export default class HCODropdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            organizationName: "",
            dropdownMade: false,
            orgTickets: "",
        }
        this.chooseOrg = this.chooseOrg.bind(this)
    }

    chooseOrg(event) {         
        this.setState({organizationName: event.target.value, dropdownMade: true}, function() {
            this.setState({orgTickets: ""})
            this.getHCOInfo();
            this.getRRTickets();
        });
    }

    getTickets() {
        let _this = this

        var request_params = {
            url: config.API() + '/tickets/' + this.state.organizationName
        }

        axios(request_params)
        .then(function(response){
            _this.setState({orgTickets: response.data}) 
        })
        .catch(function (error){
            _this.setState({orgTickets: "Error"})
        })
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
        } else if (this.state.organizationName !== "" && this.state.orgTickets === "") {
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
        } else if (this.state.orgTickets !== "") {
            return (
                <div>
                    <div align="center">
                        <select className="flex-dropdown" id="orgSelection" name="org" onChange={this.chooseOrg} value={this.state.organizationName} align="center">
                            {this.HCODropdown()}               
                        </select>
                    </div>
                    <HCOTable currentOrg={this.state.organizationName} tickets={this.state.orgTickets}/>                    
                </div>
            )
        } else {
            return (
                <h3>Nothing to see here</h3>
            )
        }
    
    }
}