import React from 'react'

export default class Layout extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            pagestate: this.props.pagestate
        };

        this.gotoDQPage = this.gotoDQPage.bind(this);
        
    }

   gotoDQPage(){
        this.state.pagestate.toggleNewPage("DQ_Page")
   }
      
    render(){
        return(
            <div id={"sidebar"}>
                <img src={require('./images/TriNetX-Lens-BK.jpg')} alt={"logo"} id={"sidebarLogo"}/>
                <button className="page" key={"dq_tickets"} onClick={this.gotoDQPage}>Data Quality Tickets</button>
            </div>
        );
    }

}