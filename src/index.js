import React from 'react';
import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container';
import RETURNS_TABLE from './returns_table';


export default class App extends React.Component {
    

    render() {
        console.log("PROPS", this.props)
         return (
             <Container style={{textAlign: 'center', paddingTop: '100px'}}>
                 <h3>S&P 500 Total Returns by Year</h3>
                 <RETURNS_TABLE />
             </Container>
         )
     }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);