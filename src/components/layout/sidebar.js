import React, { Component } from 'react'
import Sidebar from 'react-sidebar'
import SidebarItems from './sidebar_items'
import Landing from './landing'
import DQ_Page from '../pages/dq_tickets/dq_tickets'
import RR_Page from '../pages/refresh_tickets/refresh_tickets'
import HCO_Page from '../pages/hco_info/hco_info'
import Support_Ticket_Page from '../pages/org_tickets/org_tickets'

export default class SidebarMenu extends React.Component {

    constructor(props) {
      
      super(props);
    
      this.state = {
        sidebarOpen: true,
        landingToggle: true,
        dqPageToggle: false,
        rrPageToggle: false,
        supportTicketPageToggle: false,
        currentPage: "TriNetX Support Portal"
      }
    
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
      this.menuButtonClick = this.menuButtonClick.bind(this)
      this.toggleNewPage = this.toggleNewPage.bind(this)
     
      }
    
    menuButtonClick() {
      this.onSetSidebarOpen(!this.state.onSetsidebarOpen)
    }

    onSetSidebarOpen(open) {
      this.setState({sidebarOpen: open})
    }

    toggleNewPage(page) {
      switch (page) {
        case "DQ_Page":
          this.setState({
            dqPageToggle: true,
            rrPageToggle: false,
            hcoPageToggle: false,
            supportTicketPageToggle: false,
            sidebarOpen: false,
            landingToggle: false,
            currentPage: "Data Quality Tickets"
          });
          break;
        case "RR_Page":
          this.setState({
            rrPageToggle: true,
            dqPageToggle: false,
            hcoPageToggle: false,
            supportTicketPageToggle: false,
            sidebarOpen: false,
            landingToggle: false,
            currentPage: "HCO Refresh Tickets"            
          });
          break;
        case "HCO_Info_Page":
          this.setState({
            dqPageToggle: false,
            rrPageToggle: false,
            hcoPageToggle: true,
            supportTicketPageToggle: false,
            sidebarOpen: false,
            landingToggle: false,
            currentPage: "HCO Information"
          });
          break;
        case "Support_Ticket_Page":
          this.setState({
            dqPageToggle: false,
            rrPageToggle: false,
            hcoPageToggle: false,
            supportTicketPageToggle: true,
            sidebarOpen: false,
            landingToggle: false,
            currentPage: "Support Tickets"
          });
          break;
        }
    }

  render() {

    var sidebarItems = <SidebarItems pagestate={this}/> 

    return (
      <div>
            <Sidebar sidebar={sidebarItems}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}>

              <div id="topBanner">
                <img id={"menuIcon"} src={require("./images/menu_icon.png")} onClick={this.menuButtonClick}/>
                <h1 id={"pageTitle"}>{this.state.currentPage}</h1>
              </div>

              {
                this.state.dqPageToggle
                  ? <DQ_Page/>
                  : null
              }
              {
                this.state.rrPageToggle
                  ? <RR_Page/>
                  : null
              }
              {
                this.state.hcoPageToggle
                  ? <HCO_Page/>
                  : null
              }
              {
                this.state.supportTicketPageToggle
                  ? <Support_Ticket_Page/>
                  : null
              }
              {
                this.state.landingToggle
                ? <Landing/>
                : null
              }


            </Sidebar>
    </div>
    );
  }

}