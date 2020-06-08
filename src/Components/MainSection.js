import React from 'react';
import Grid from '@material-ui/core/Grid';

class MainSection extends React.Component{

  render(){
    return(
    //   <Grid>
    //     <Grid
    //       className = "topBar"
    //       xs = {11}
    //       sm = {11}

    //       container
    //       direction="row"
    //       justify="flex-start"
    //       alignItems="flex-start"
    //     >
    //     <div>
    //       <h6>Do You Want to Help Corona Victims? </h6>
    //     </div>
    //     </Grid>
    //     <Grid container direction="row" justify="space-evenly"
    //       //alignItems="flex-start"
    //     >

    //         <Grid
    //           className = "sideNavGrid" xs={11} sm={3}
    //           container alignItems="flex-start" justify="flex-start"
    //         >
    //               {/* <div className = "sideNave">
    //                 <h1> We will Create a side Nav!!!! </h1>
    //               </div> */}

    //             <ul className = "sideNavList">
    //               <li>Details</li>
    //               <li>News</li>
    //               <li>Want to Help?</li>  
    //             </ul>    

    //         </Grid>

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
                        <h1> This is Lower Content </h1>
                      </div>
                  </Grid>
                  <Grid className = "lowerDiv" xs={12} sm={3} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> This is Lower Content </h1>
                      </div>
                  </Grid>
                  <Grid className = "lowerDiv" xs={12} sm={3} 
                  container alignItems="center"
                  //direction="row"
                  >
                      <div className = "sideNave">
                        <h1> This is Lower Content </h1>
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
