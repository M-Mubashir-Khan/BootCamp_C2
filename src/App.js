import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import {Line,Bar} from 'react-chartjs-2';
import CountUp from 'react-countup';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      Country : "",
      mainContent : "",
      fetchedData : {
          Confirmed : "",
          Recovered : "",
          Deaths : "",
        },
      DailyReport : {
          Dates: [],   
          Confirmed : [],
          Deaths : [],
      },  
    }
      this.handleChange = this.handleChange.bind(this);
      this.getAPIData = this.getAPIData.bind(this);
      this.getAPIDataCountry = this.getAPIDataCountry.bind(this);
      this.getCountries = this.getCountries.bind(this);
      this.getAPIDailyData = this.getAPIDailyData.bind(this);
    }

    componentDidMount() {
      this.getAPIData();
      this.getCountries();
      this.getAPIDailyData();
    }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    //console.log(this.state.Country);
    if(event.target.value === "Global"){
      //console.log("is empty");
      this.getAPIData();    
    }else{
    this.getAPIDataCountry(event.target.value)
  }
  }

  async getAPIDailyData() {
    //console.log(props)
    let doc =  await axios.get(`https://covid19.mathdro.id/api/daily`)
    //console.log(doc.data);
    let data = doc.data;
    // const DailyReport = data.map((doc, i) => ({
    //            Dates : doc.reportDate,
    //            Confirmed : doc.confirmed.total,
    //           Deaths: doc.deaths.total
    //         }))

      this.setState({
        Dates : data.map((doc, i) => (
          doc.reportDate
        )),
        Confirmed : data.map((doc, i) => (
          doc.confirmed.total
        )),
        Deaths: data.map((doc, i) => (
          doc.deaths.total
        )) 
           
     })
    // console.log(this.state.Dates)
    // console.log(this.state.Confirmed)
    // console.log(this.state.Deaths)
            
    //console.log(DailyReport)

    //   this.setState({
    //     DailyReport : data.map((doc, i) => ({
    //       Dates : doc.reportDate,
    //       Confirmed : doc.confirmed.total,
    //       Deaths: doc.deaths.total
    //     }))   
    //  })
  }

  async getAPIDataCountry(props) {
    //console.log(props)
    let doc =  await axios.get(`https://covid19.mathdro.id/api/countries/${props}`)
    //console.log(doc);
    this.setState({
      fetchedData : {
        Confirmed : doc.data.confirmed.value,
        Recovered : doc.data.recovered.value,
        Deaths : doc.data.deaths.value
      },
      Country : props
    })
  }
  async getAPIData() {
    let doc =  await axios.get('https://covid19.mathdro.id/api')
   // console.log(doc);
    this.setState({
      fetchedData : {
        Confirmed : doc.data.confirmed.value,
        Recovered : doc.data.recovered.value,
        Deaths : doc.data.deaths.value
      },
      Country : "Global"
    })
  }
  async getCountries() {
    let doc =  await axios.get('https://covid19.mathdro.id/api/countries')
    //console.log(doc.data); 
    let data = doc.data.countries;
    //this.setState({ countryList : data})
    
    if (data.length > 0  ){
    //  console.log("In data")    
    this.setState({
     countryName: data.map((doc, i) => (
      //console.log(doc.name);
      <MenuItem value={doc.name}>{doc.name}</MenuItem>       
      
      )) });
            
  }
  }

  render(){

    let Chart;
    if (this.state.Country === "Global" ) {
      Chart = <Line 
      className = "LineChart"
      options={{
        
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          labels: {
              // This more specific font property overrides the global property
              fontColor: 'white'
          }
      },
      scales: {
          xAxes: [{
            gridLines: { color: "#131c2b" },
            ticks: {
              fontColor: "white",
              fontSize: 10
             }}],
          yAxes: [{gridLines: { color: "#131c2b" },
          ticks: {
            fontColor: "white",
            fontSize: 10
           }}]
          },
      }}
      data = {{
        labels: this.state.Dates,
        datasets:[{
          data:this.state.Confirmed,
          label:"Infected",
          borderColor: 'yellow',
          fill:true

        },{
          data:this.state.Deaths,
          label:"Deaths",
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.5)',
          fill:true
        }]
  }}/>;
    } else {
      Chart = <Bar
      data={{
        labels : ["Infected","Recovered","Deaths"],
        datasets : [{
         
          label : "People",
          backgroundColor : [
            "rgba(255,255,0,0.7)",
            "rgba(0,255,0,0.7)",
            "rgba(255,0,0,0.7)"
          ],
          data : [
            this.state.fetchedData.Confirmed,
            this.state.fetchedData.Recovered,
            this.state.fetchedData.Deaths
          ]
        }]
      }}
      options={{
        legend: {
          display:false
        },
         title : {display:true, text:`Current state in ${this.state.Country}`, fontColor: 'white'},
         scales: {
          xAxes: [{
            gridLines: { color: "#131c2b" },
            ticks: {
              fontColor: "white",
              fontSize: 12
             }}],
          yAxes: [{gridLines: { color: "#131c2b" },
          ticks: {
            fontColor: "white",
            fontSize: 10
           }}]
          },
      }}
  />     ;
    }

    

    return(
      //<div style>Hi React</div>
      <Grid>
        
        <Grid container direction="row" justify="space-evenly"
        style={{marginBottom:20}}
          //alignItems="flex-start"
        >

            <Grid
              className = "sideNavGrid" xs={11} sm={3}
              container alignItems="flex-start" justify="center"
            >
                  {/* <div className = "sideNave">
                    <h1> We will Create a side Nav!!!! </h1>
                  </div> */}
                  
                {/* <FormControl variant="outlined" className={classes.formControl}> */}
                <FormControl variant="outlined" className="formControl"style={{marginTop:20}}>
                    <h4>SELECT COUNTRY</h4>
                    {/* <InputLabel id="demo-simple-select-filled-label" >Select Country</InputLabel> */}
                    <Select
                       labelId="demo-simple-select-filled-label"
                       id="demo-simple-select-filled"
                      
                      className="countrySelector"
                      name ="Country"
                      onChange={this.handleChange}
                      // label="Select Country"
                      value = {this.state.Country}
                    >
                       <MenuItem value={"Global"}>
                        Global
                      </MenuItem>
                      {/*<MenuItem value={"Pakistan"}>Pakistan</MenuItem>
                      <MenuItem value={"China"}>China</MenuItem>
                      <MenuItem value={"Turkey"}>Turkey</MenuItem> */}
                      {this.state.countryName}
                    </Select>
                </FormControl>  

                <img src={require('./img1.png')} alt="Precautions" className="sideImage" />
                <img src={require('./img2.png')} alt="Precautions" className="sideImage" />
                <img src={require('./img3.png')} alt="Precautions" className="sideImage" />
                <img src={require('./img4.png')} alt="Precautions" className="sideImage" />

            </Grid>

                  {/* Main Content */}
            
            <Grid className = "mainContent" xs={11} sm={8} 
                  container alignItems="flex-start" justify="space-between"
            >

              {/* Upper Div Section */}
              
                 <Grid className = "upperMainDiv" xs={12} sm={12} 
                  container alignItems="center" justify="center"
                  direction="row"
                  >
                      <div className = "ChartDiv">
                        {Chart}
                      </div>
                  </Grid>

                {/* lower Div Section */}

                  <Grid className = "lowerDiv" xs={12} sm={12} md={3}
                  container alignItems="flex-start" justify="center"
                  style={{border:"solid",borderColor:"yellow"}}
                  // direction="row"
                  >
                    
                    {/* <br/> */}
                      <div className = "sideNave" xs={12}>
                      <Avatar alt="Remy Sharp" src={"alert.png"} style={{borderRadius:0,margin:"auto",marginTop:10}} />  
                        <h3> CONFIRMED </h3>
                        <h2>
                          <CountUp 
                            start={0} 
                            end={this.state.fetchedData.Confirmed}
                            duration = {2.5}
                            separator = ',' /> 
                        </h2>
                      </div>
                  </Grid>
                  <Grid className = "lowerDiv" xs={12} sm={12} md={3} 
                   container alignItems="flex-start" justify="center"
                   style={{border:"solid",borderColor:"green"}}
                  //direction="row"
                  >
                      <div className = "sideNave">
                      <Avatar alt="Remy Sharp" src={"tick.png"} style={{borderRadius:0,margin:"auto",marginTop:10}} />  
                        <h3> RECOVERED </h3>
                        <h2>
                          <CountUp 
                            start={0} 
                            end={this.state.fetchedData.Recovered}
                            duration = {2.5}
                            separator = ',' /> 
                        </h2>
                        
                      </div>
                  </Grid>
                  <Grid className = "lowerDiv" xs={12} sm={12} md={3} 
                   container alignItems="flex-start" justify="center"
                   style={{border:"solid",borderColor:"maroon"}}
                  //direction="row"
                  >
                    
                      <div className = "sideNave">
                        <Avatar alt="Remy Sharp" src={"close.png"} style={{borderRadius:0,margin:"auto",marginTop:10}} />  
                        <h3> DEATHS </h3>
                        <h2>
                          <CountUp 
                            start={0} 
                            end={this.state.fetchedData.Deaths}
                            duration = {2.5}
                            separator = ',' /> 
                        </h2>
                      </div>
                  </Grid>

                {/* Notification Div Section */}
              
                  <Grid className = "notificationDiv" xs={12} sm={12} 
                  container alignItems="center" 
                  //direction="row"
                  >
                      <div className = "sideNave">
                          <a href="https://e-payment.nbp.com.pk/" target="_blank" rel="noopener noreferrer" >
                            <img src={require('./covid.jpeg')} alt="Account" className="images" />
                            </a>
                      </div>
                  </Grid>

                  {/* <Grid className = "notificationDiv" xs={12} sm={6} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                          <img src={require('./Precautions.png')} className="images"/>
                      </div>
                  </Grid> */}

            </Grid>
        </Grid>
      </Grid>
    )
  }
}



export default App;
