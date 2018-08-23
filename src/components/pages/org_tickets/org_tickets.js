import React from 'react'
import axios from 'axios'
import '../../../../node_modules/react-table/react-table.css'
import HCODropdown from './org_dropdown'
import { BeatLoader } from 'react-spinners';
let config = require('../../../config/config.js')

export default class RefreshPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            orgs_JSON: "",
            organizationName: "",
            showMenu: false,
        }        
    }   

    updateHCOs() {               
        let _this = this;
        var request_params = {
            url: config.API() + '/orgs/all'  
        }
        axios(request_params)
        .then(function(response){
            const sortedOrgs = [].concat(response.data.results)
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
                <div align="center">
                    <br/><br/>
                    <BeatLoader
                        color={'#00467F'} 
                        loading={true}
                    />
                    <p class="loading">Loading HCOs</p>
                </div>         
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
        }
    }
}