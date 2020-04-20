import React from 'react';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BackspaceIcon from '@material-ui/icons/Backspace';
import HistoryIcon from '@material-ui/icons/History';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const buttonText = [ [
                            {text : 'AC', op : 'clear'},
                            {text : <BackspaceIcon />, op : 'delete'},
                            {text : '%', op : 'percentage'},
                            {text : '/', op : 'division'}
                          ],
                    [
                            {text : '7'},
                            {text : '8'},
                            {text : '9'},
                            {text : 'X'}
                          ],
                    [
                            {text : '4'},
                            {text : '5'},
                            {text : '6'},
                            {text : '-'}
                          ],
                    [
                            {text : '1'},
                            {text : '2'},
                            {text : '3'},
                            {text : '+'}
                          ],
                  [
                      {text : <HistoryIcon/>},
                      {text : '0'},
                      {text : '.'},
                      {text : '='}
                    ]                          
                  ];

function App() {

  return (
          <Container>
            <Card>
                <CardHeader>

                </CardHeader>
                <CardContent>
                  <Grid container spacing={0}>
                    {buttonText.map((rows, i) => {
                      return (<Grid item xs={12} key = {i}>
                                <ButtonGroup color="default" 
                                          aria-label="outlined default button group">
                                  {rows.map((btn, i) => <Button variant="contained" key={i} 
                                                          size="large">
                                                            {btn.text}
                                                    </Button>)}
                                </ButtonGroup>
                              </Grid>)  
                    })}
                  </Grid>
              </CardContent>
            </Card>
          </Container>  
         );
}

export default App;
