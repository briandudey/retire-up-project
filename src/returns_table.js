import React from 'react';
import {Table, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RANGE_SLIDER from './range_slider';
import sp_data from './sp_data.json';

//Headers for table
const columnHeader = ['Year', 'Total Return', 'Cumulative Return']
let tableData;

export default class Returns_Table extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           changed: false,
           rangeA: 1920,
           rangeB: 2020,
       }
       this.generateHeader = this.generateHeader.bind(this);
       this.generateTableData = this.generateTableData.bind(this);
       this.generateNewTableData = this.generateNewTableData.bind(this);
   }

   //Generates header using 'columnHeader' variable
  generateHeader() {
      let res = [];
      for (let i = 0; i < columnHeader.length; i++) {
          res.push(<th id={columnHeader[i]}>{columnHeader[i]}</th>)
      }
      return res;
  }

  //Initial state of table is generated with the date range set at 1926-2020
    generateTableData(){
        let res = [];
        //sorts data descending
        tableData = sp_data.data.sort(function(a, b){
            return a.year - b.year
        });
        //creates an array of the total returns
        let newArrayString = tableData.map(a => a.totalReturn);
        //turns the array of strings into an array of numbers
        let newArrayNumber = newArrayString.map(Number);
        //does the required math to the array of total returns and creates an array of the cumulative returns
        let cumulativeArray = newArrayNumber.map((s => a => s += a)(0));
        //rounds the cumulative returns to the second decimal, allows for a 0 in the second decimal spot for better UI
        let cumulativeArrayRounded = cumulativeArray.map(number => Number.parseFloat(number).toFixed(2));

        //adds the key value pair of cumulative total to the data
        tableData.forEach((el, i) => {
            el.cumulativeTotal = cumulativeArrayRounded[i];
        })

        //converts data to jsx to be displayed in table
        for(let i = 0; i < tableData.length; i++){
            res.push(
                <tr key={[i]}>
                    <td key={tableData[i].year}>{tableData[i].year}</td>
                    <td key={tableData[i].totalReturn}>{tableData[i].totalReturn}</td>
                    <td key={tableData[i].cumulativeTotal + 1}>{tableData[i].cumulativeTotal}</td>
                </tr>
            )
        }
        return res;
    }

//Any change made to slider will switch the "changed" state to true and a new table will be rendered based on users selected ranges
  generateNewTableData(data){

      let dataA;
      let dataB;
      let res = [];

      if(data[0] > 1920 || data[1] < 2020){
          dataA = data[0];
          dataB = data[1];
      } else {
          dataA = data.sliderValues[0];
          dataB = data.sliderValues[1];
          this.setState({
              changed: true,
              rangeA: dataA,
              rangeB: dataB,
          })
      }

      //takes the tableData variable and filters based on selected ranges, returns the new data to be rendered
      let filteredArray= tableData.filter(function(val) {
          return val.year >= dataA && val.year <= dataB;
      })

       for(let i = 0; i < filteredArray.length; i++){
           res.push(
               <tr key={[i]}>
                   <td key={filteredArray[i].year}>{filteredArray[i].year}</td>
                   <td key={filteredArray[i].totalReturn}>{filteredArray[i].totalReturn}</td>
                   <td key={filteredArray[i].cumulativeTotal + 1}>{filteredArray[i].cumulativeTotal}</td>
               </tr>
           )
       }
       return res;
  }

    render() {
        console.log(this.generateTableData());
        console.log(this.props);
        return (
            <Container >
                <RANGE_SLIDER onChange={this.generateNewTableData}/>
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            {this.generateHeader()}
                        </tr>
                    </thead>
                    {!this.state.changed &&
                    <tbody style={{textAlign: 'left'}}>
                        {this.generateTableData()}
                    </tbody>
                        }
                    {this.state.changed &&
                        <tbody style={{textAlign: 'left'}}>
                            {this.generateNewTableData([this.state.rangeA, this.state.rangeB])}
                        </tbody>
                    }
                </Table>
            </Container>
        );
    }
   }