import React,{ useState,useEffect } from 'react';
import{Bar,Line, Pie} from 'react-chartjs-2';
// import ApexCharts from "react-apexcharts";

import axios from 'axios';

const TempRecord = props => (
    <tr>        
        <td>{props.TempRecord.sensor_id}</td>
        <td>{props.TempRecord.date}</td>
        <td>{props.TempRecord.data_value}</td>
    </tr>
)

const TemperatureChart =()=>{
    
    var[chartData, setChartData] = useState({});
    const[temperatureData, setTemperatureData] = useState([]);
    const[timeSeriesData, setTimeData] = useState([]);
    

    const Chart =()=>{
        let TempData_x =[];
        let TimeData_x =[];
        let TempData_y =[];
        let TimeData_y =[];
        axios.get("http://localhost:8080/tempreadings/")
        .then(response => {
            console.log(response) 
            
            //  for (const dataObj of response.data.data){
            for (const dataObj of response.data){
                if(dataObj.sensor_id === "xxxx"){
                    console.log(dataObj.sensor_id)
                    TempData_x.push(parseFloat(dataObj.data_value))
                    TimeData_x.push(parseFloat(dataObj.date)) 
                }
                else if (dataObj.sensor_id === 'yyyy'){
                    TempData_y.push(parseFloat(dataObj.data_value))
                    TimeData_y.push(parseFloat(dataObj.date))
                }
            }
            setChartData({
                // chartData :{
                    labels:TimeData_x,
                    datasets: [{
                        label: 'Temperature data XXXX',
                        data: TempData_x,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        display : true,
                    },
                    {
                        label: 'Temperature data YYYY',
                        data: TempData_y,
                        fill: false,
                        borderColor: 'rgb(75, 55, 192)',
                        tension: 0.1,
                        display : true,
                    }]
                    
            });
        })
        .catch((error) =>{
            console.log(error);
        })
        console.log(TempData_x, TimeData_x)

        
    }

    useEffect(() => {
        Chart();
        console.log("chart")
    },[]);

     return(
        <div className="chart">
            <div className ="TemperatureChart" >
            <Line
                // data={this.state.chartData}
                data ={chartData}
                options = {{
                    title :{
                        display: true,
                        text:'Temperature Variation',
                        fontSize : 25,
            
                    },
                    legend :{
                        // display: this.props.displayLegend,
                        // position : this.props.legendPosition,
                        display: true,
                        position : true,
                    },
                    responsive: true,
                    // maintainAspectRatio: false
                }}
            />
            
            </div>
        </div>
    )
}

export default TemperatureChart;