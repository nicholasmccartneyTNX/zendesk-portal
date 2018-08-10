import React from 'react'

export default class Layout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pagestate: this.props.pagestate
        };

        this.gotoDQPage = this.gotoDQPage.bind(this);
        this.gotoRRPage = this.gotoRRPage.bind(this);
        this.gotoHCOPage = this.gotoHCOPage.bind(this);
    }

   gotoDQPage(){
        this.state.pagestate.toggleNewPage("DQ_Page")
   }

   gotoRRPage(){
       this.state.pagestate.toggleNewPage("RR_Page")
   }

   gotoHCOPage(){
       this.state.pagestate.toggleNewPage("HCO_Page")
   }
      
    render(){
        return(
            <div id={"sidebar"}>
                <img src={require('./images/TriNetX-Lens-BK.jpg')} alt={"logo"} id={"sidebarLogo"}/>
                <button className="page" key={"dq_tickets"} onClick={this.gotoDQPage}>Data Quality Tickets</button>
                <button className="page" key={"rr_tickets"} onClick={this.gotoRRPage}>HCO Refresh Tickets</button>
                <button className="page" key={"hco_page"} onClick={this.gotoHCOPage}>HCO Information</button>
            </div>
        );
    }

}