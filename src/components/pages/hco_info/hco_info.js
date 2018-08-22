import React from 'react'
import ReactTable from 'react-table';
import axios from 'axios'
import Popup from 'reactjs-popup'
import { BeatLoader } from 'react-spinners';
import '../hco_info/hco_info.css';
let config = require('../../../config/config.js')

export default class HCOInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orgs_JSON: "",
            orgUsers: "",
            loadingHCO: false,
            loadingUsers: false,
        }
        this.updateHCOs = this.updateHCOs.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.makeHCOInfoPage = this.makeHCOInfoPage.bind(this)
        this.onRowClick = this.onRowClick.bind(this)
    }
    
    onRowClick(cellInfo) {
        let column = cellInfo.column['Header']

        let data = {'name': cellInfo.original.name, 'hcoRefresh': cellInfo.original.hcoRefresh, 'tnxRefresh': cellInfo.original.tnxRefresh, 'dataSource': cellInfo.original.dataSource, 'refreshInterval': cellInfo.original.refreshInterval, 'refreshReminder': cellInfo.original.refreshReminder, 'orgAdmin': cellInfo.original.orgAdminNames, 'refreshAdmin': cellInfo.original.refreshAdminNames, 'refreshCCNames': cellInfo.original.refreshCCNames, 'notes': cellInfo.original.notes}
       
        if (column === 'Organization') {
            return (
                <Popup trigger={<div><p> {cellInfo.original.name} </p></div>} modal> 
                    <div>
	                    <h3>{data['name']}</h3>
	                    <h4>Refresh Information</h4>
	                    <div className='flex-container-down'>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>HCO Refresh Schedule:</p><p className='flex-text-right'>{data['hcoRefresh']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>TriNetX Refresh Schedule:</p><p className='flex-text-right'>{data['tnxRefresh']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Data Source:</p><p className='flex-text-right'>{data['dataSource']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh Interval:</p><p className='flex-text-right'>{data['refreshInterval']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Current Refresh Reminder Date:</p><p className='flex-text-right'>{data['refreshReminder']}</p>
	                    	</div>
	                    </div>
	                    <h4>Admin Information</h4>
	                    <div className='flex-container-down'>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Org Admin:</p><p className='flex-text-right'>{data['orgAdmin']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh Admin:</p><p className='flex-text-right'>{data['refreshAdmin']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh CCs</p><p className='flex-text-right'>{data['refreshCCNames']}</p>
	                    	</div>
	                    </div>
	                    <h4>Notes</h4>
	                    <p className='flex-text-center'>{data['notes']}</p>
                    </div>
                </Popup>
            )
        }

        if (column === 'Last Refresh Date') {
            return (
                <Popup trigger={<div><p> {cellInfo.original.lastRefresh} </p></div>} modal> 
                    <div>
	                    <h3>{data['name']}</h3>
	                    <h4>Refresh Information</h4>
	                    <div className='flex-container-down'>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>HCO Refresh Schedule:</p><p className='flex-text-right'>{data['hcoRefresh']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>TriNetX Refresh Schedule:</p><p className='flex-text-right'>{data['tnxRefresh']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Data Source:</p><p className='flex-text-right'>{data['dataSource']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh Interval:</p><p className='flex-text-right'>{data['refreshInterval']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Current Refresh Reminder Date:</p><p className='flex-text-right'>{data['refreshReminder']}</p>
	                    	</div>
	                    </div>
	                    <h4>Admin Information</h4>
	                    <div className='flex-container-down'>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Org Admin:</p><p className='flex-text-right'>{data['orgAdmin']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh Admin:</p><p className='flex-text-right'>{data['refreshAdmin']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh CCs</p><p className='flex-text-right'>{data['refreshCCNames']}</p>
	                    	</div>
	                    </div>
	                    <h4>Notes</h4>
	                    <p className='flex-text-center'>{data['notes']}</p>
                    </div>
                </Popup>
            )
        }
        if (column === 'Patient Count') {
            return (
                <Popup trigger={<div><p> {cellInfo.original.patientCount} </p></div>} modal> 
                    <div>
	                    <h3>{data['name']}</h3>
	                    <h4>Refresh Information</h4>
	                    <div className='flex-container-down'>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>HCO Refresh Schedule:</p><p className='flex-text-right'>{data['hcoRefresh']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>TriNetX Refresh Schedule:</p><p className='flex-text-right'>{data['tnxRefresh']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Data Source:</p><p className='flex-text-right'>{data['dataSource']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh Interval:</p><p className='flex-text-right'>{data['refreshInterval']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Current Refresh Reminder Date:</p><p className='flex-text-right'>{data['refreshReminder']}</p>
	                    	</div>
	                    </div>
	                    <h4>Admin Information</h4>
	                    <div className='flex-container-down'>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Org Admin:</p><p className='flex-text-right'>{data['orgAdmin']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh Admin:</p><p className='flex-text-right'>{data['refreshAdmin']}</p>
	                    	</div>
	                    	<div className='flex-container-across'>
	                    		<p className='flex-text-left'>Refresh CCs</p><p className='flex-text-right'>{data['refreshCCNames']}</p>
	                    	</div>
	                    </div>
	                    <h4>Notes</h4>
	                    <p className='flex-text-center'>{data['notes']}</p>
                    </div>
                </Popup>
            )
        }

    }

    updateHCOs() {               
        let _this = this;
        var request_params = {
            url: config.API() + '/HCOs'
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
            _this.setState({loadingHCO: true, orgs_JSON: sortedOrgs})
        })
        .catch(function (error){
            _this.setState({orgs_JSON: "Error"})
        })
    }

    getUsers(orgName) {

        let _this = this
        let org = orgName
        var request_params = {
            url: config.API() + '/users'
        }
        
        axios(request_params)
        .then(function(response){
            _this.setState({loadingUsers: true, orgUsers: response.data})
        })
        .catch(function (error){
            _this.setState({orgUsers: "Error"})
        })
    }

    makeHCOInfoPage() {
        let orgs = this.state.orgs_JSON
        let users = this.state.orgUsers
        let names = []
        let options = {}

        for (let i = 0; i < orgs.length; i ++) {
            
            let name = orgs[i]['name']
            let id = orgs[i]['id']
            let hcoRefresh = orgs[i]['organization_fields']['hco_refresh_schedule']
            let tnxRefresh = orgs[i]['organization_fields']['trinetx_refresh_schedule']
            let dataSource = orgs[i]['organization_fields']['data_source']
            dataSource = (dataSource !== null) ? ((dataSource === "data_source_i2b2") ? ("i2b2") : ((dataSource === "data_source_files") ? ("Files") : ((dataSource === "data_source_i2b2_files") ? ("i2b2 & files") : (refreshInterval)))) : (refreshInterval)
            let refreshInterval = orgs[i]['organization_fields']['refresh_interval']
            let refreshReminder = (orgs[i]['organization_fields']['current_refresh_reminder'] !== null) ? orgs[i]['organization_fields']['current_refresh_reminder'].substring(0, 10) : ""
            let notes = orgs[i]['notes']

            let refreshAdminList = []
            let refreshCCList = []
            let orgAdminList = []

            for (let j = 0; j < users.length; j ++) {
                let userOrgID = users[j]['organization_id']
                if (userOrgID === id) {
                    if (users[j]['user_fields']['customer_admin'] === true) {
                        orgAdminList.push(users[j]['name'])
                    }
                    if (users[j]['user_fields']['refresh_admin'] === true) {
                        refreshAdminList.push(users[j]['name'])
                    }
                    if (users[j]['user_fields']['refresh_cc'] === true) {
                        refreshCCList.push(users[j]['name'])
                    }
                }
            }

            let refreshCCNames = ''

            if (refreshCCList.length > 0) {
                for (let i = 0; i < refreshCCList.length; i ++) {
                    refreshCCNames = refreshCCNames + refreshCCList[i] + '\n'
                }
            }

            let refreshAdminNames = ''

            if (refreshAdminList.length > 0) {
                for (let i = 0; i < refreshAdminList.length; i ++) {
                    refreshAdminNames = refreshAdminNames + refreshAdminList[i] + '\n'
                }
            }

            let orgAdminNames = ''

            if (orgAdminList.length > 0) {
                for (let i = 0; i < orgAdminList.length; i ++) {
                    orgAdminNames = orgAdminNames + orgAdminList[i] + '\n'
                }
            }

            
            let lastRefresh
            if (orgs[i]['organization_fields']['latest_refresh_date'] === null) {
                lastRefresh = ""
            } else {
                lastRefresh = new Date(orgs[i]['organization_fields']['latest_refresh_date'])
                lastRefresh = lastRefresh.toLocaleDateString("en-US", options)
            }
            let patientCount = orgs[i]['organization_fields']['patient_count']
            if (patientCount !== null) {
                patientCount = parseFloat(patientCount).toLocaleString('en')
            } else {
                patientCount = ""
            }
            names.push({name, hcoRefresh, tnxRefresh, dataSource, refreshInterval, refreshReminder, orgAdminNames, refreshAdminNames, refreshCCNames, notes, lastRefresh, patientCount})
            
        }
        return names
    }

    render() {
        if ((this.state.loadingHCO === false && this.state.loadingUsers === false)) {
            this.updateHCOs();
            this.getUsers();      
                return (
                    <div align="center">
                        <br/><br/>
                        <BeatLoader
                            color={'#00467F'} 
                            loading={true}
                        />
                        <p class="loading">Loading HCOs and Users</p>
                    </div>         
                )
        } else if (this.state.loadingHCO === false || this.state.loadingUsers === false) {
            return(
                <div align="center">
                    <br/><br/>
                    <BeatLoader
                        color={'#00467F'} 
                        loading={true}
                    />
                    <p class="loading">Loading HCOs and Users</p>
                </div>         
            )
        } else if ((this.state.orgs_JSON !== "" && this.state.orgUsers !== "")) {

            let topLevelColumns = [
                {Header:'Organization', accessor:'name', width:500, Cell: (cellInfo) => (this.onRowClick(cellInfo))},
                {Header:'Last Refresh Date', accessor:'lastRefresh', width:200, Cell: (cellInfo) => (this.onRowClick(cellInfo))},
                {Header:'Patient Count', accessor:'patientCount', width:200, Cell: (cellInfo) => (this.onRowClick(cellInfo))},
            ]

            return (


                <div align='center' className='smallTable'>
                    <p className='hint'>Click any row to view detailed information about the organization.</p>
                    <ReactTable 
                        data={this.makeHCOInfoPage()}
                        columns={topLevelColumns}
                        showPagination={false}
                        defaultPageSize={this.state.orgs_JSON.length}
                        className='-striped -highlight'
                    />
                    <br/>

                </div>
            )
        } else {
            return (
                <h3>Nothing to see here</h3>
            )
        }
    }
}