import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class MainSection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fetchedData : {
        Confirmed : "",
        Recovered : "",
        Deaths : "",
      },
      country : props.country
    }
    this.getAPIData = this.getAPIData.bind(this);
    this.getAPIDataCountry = this.getAPIDataCountry.bind(this);
  }
  
  componentDidMount() {
    console.log(this.state.country);
    // if (this.state.country == ""){
    //   this.getAPIData();
    // }else{
    //   this.getAPIDataCountry(this.state.country)
    // }
    
  }

  async getAPIDataCountry(props) {
    let doc =  await axios.get(`https://covid19.mathdro.id/api/countries/${props.country}`)
    console.log(doc);
    this.setState({
      fetchedData : {
        Confirmed : doc.data.confirmed.value,
        Recovered : doc.data.recovered.value,
        Deaths : doc.data.deaths.value
      }
    })
  }
  async getAPIData() {
    let doc =  await axios.get('https://covid19.mathdro.id/api')
    console.log(doc);
    this.setState({
      fetchedData : {
        Confirmed : doc.data.confirmed.value,
        Recovered : doc.data.recovered.value,
        Deaths : doc.data.deaths.value
      }
    })
    //   let data = doc.data;
  //   if (data.length > 0  ){
  //   console.log(data[0].Approved); 
  //   this.setState({
  //    UserData: data.map((doc, i) => (
      
  //        <tr key={doc._id}>
  //          <td>{doc.Name}</td>
  //          <td>{doc.NIC}</td>
  //          <td>{doc.Number}</td>
  //          <td>{doc.Role}</td>
  //          <td><button type = "submit" onClick={() => this.setApprove(doc._id)} class="waves-effect waves-light btn">Approve</button></td>
  //        </tr>
  //      ))
  //    });
   
  //  }
   }

  render(){
    return(
    
            <Grid className = "mainContent" xs={11} sm={8} 
                  container alignItems="flex-start" justify="space-between"
            >

              {/* Upper Div Section */}
              
                 <Grid className = "upperMainDiv" xs={12} sm={12} 
                  container alignItems="center"
                  direction="row"
                  >
                      <div className = "sideNave">
                        <h1> This is upper content </h1>
                      </div>
                  </Grid>

                {/* lower Div Section */}

                  <Grid className = "lowerDiv" xs={12} sm={3} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> Confirmed </h1>
                        <p> {this.state.fetchedData.Confirmed} </p>
                      </div>
                  </Grid>
                  <Grid className = "lowerDiv" xs={12} sm={3} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> Recovered </h1>
                        <p>{this.state.fetchedData.Recovered}</p>
                      </div>
                  </Grid>
                  <Grid className = "lowerDiv" xs={12} sm={3} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> Deaths </h1>
                        <p>{this.state.fetchedData.Deaths}</p>
                      </div>
                  </Grid>

                {/* Notification Div Section */}
              
                  <Grid className = "notificationDiv" xs={12} sm={5} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> This is Notification Content </h1>
                      </div>
                  </Grid>

                  <Grid className = "notificationDiv" xs={12} sm={5} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> This is Notification Content </h1>
                      </div>
                  </Grid>

            </Grid>


    //     </Grid>
    //   </Grid>
    )
  }
}

export default MainSection;
