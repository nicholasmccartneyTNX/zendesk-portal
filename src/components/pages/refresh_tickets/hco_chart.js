import React from 'react'
import {LineChart} from 'react-easy-chart'

export default class HCOChart extends React.Component {

    constructor(props){
        super(props)
    
        this.state={

        }
    }

    getRefreshData() {
        let data = []
        let refresh = {}
        let tickets = this.props.tickets

        for(let i = tickets.length - 1; i > -1; i --) {

            if(tickets[i].refresh_date !== "" && tickets[i].patient_count !== ""){
                refresh = { x: tickets[i].refresh_date, y: parseInt(tickets[i].patient_count.replace(/,/g,""))}
                data.push(refresh)
            }
        }
        return data
    }

    render() {
        return (
            <div>
                <h4>{this.props.name + " Refresh History"}</h4>
                <LineChart
                    xType={'text'}
                    margin={{top:50, right:50, bottom:50, left:100}}
                    height={400}
                    width={1000}
                    yTicks={5}
                    interpolate='cardinal'
                    lineColors={['red']}
                    dataPoints
                    axes
                    axisLabels={{x: "Refresh Date", y: "Patient Count"}}        
                    style={{ '.label': { fill: 'black', } }}          
                    data={[
                        this.getRefreshData()
                      ]}
                />
            </div>
        )
    }
}