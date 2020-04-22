import React, {Fragment, useState, useContext} from 'react';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BackspaceIcon from '@material-ui/icons/Backspace';
import HistoryIcon from '@material-ui/icons/History';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const buttonText = [      [
                            {text : 'AC', op : 'clear'},
                            {text : <BackspaceIcon />, op : 'delete'},
                            {text : '%', op : 'percentage'},
                            {text : '/', op : 'division'}
                          ],
                          [
                            {text : '7'},
                            {text : '8'},
                            {text : '9'},
                            {text : 'X', op : 'multiplication'}
                          ],
                          [
                            {text : '4'},
                            {text : '5'},
                            {text : '6'},
                            {text : '-', op : 'subtraction'}
                          ],
                          [
                            {text : '1'},
                            {text : '2'},
                            {text : '3'},
                            {text : '+', op : 'addition'}
                          ],
                          [
                            {text : <HistoryIcon/>, op : 'history'},
                            {text : '0'},
                            {text : '.'},
                            {text : '=', op : 'equal'}
                          ]                          
                  ];

const inputs = {
  calInput1 : '',
  calResult : '',
  setCalInput1 : '',
  setCalResult : ''
};

const InputContext = React.createContext(inputs);                  

function handleClick(e, text) {
  
  if(text.op) {
    return text.op
  }else{
    return text.text;
  }
}                  

function App() {
  const [calInput1, setCalInput1] = useState('mahesh');
  const [calResult, setCalResult] = useState('Bhanusali');
  

  return (
          <Container>
            <Card>
              <CardContent>
                <InputContext.Provider value={{calInput1, setCalInput1, calResult, setCalResult}}>
                  <ResultDisplay />                  
                  <Grid container spacing={0}>
                    {buttonText.map((rows, i) => <KeyPadLayout rows={rows} key={i}/>)}
                  </Grid>
                </InputContext.Provider>
              </CardContent>
            </Card>
          </Container>  
         );
}

function KeyPadLayout(props) {
  const {rows} = props;
  return (
          <Grid item xs={12}>
            <ButtonGroup color="default" 
                          aria-label="outlined default button group">
                          {rows.map((btn, i) => <KeyPadBtn btn={btn} key={i} />)}
            </ButtonGroup>
          </Grid>
          );
}

function KeyPadBtn(props) {
  const {setCalInput1, calInput1} = useContext(InputContext);
  console.log(`value of input ${calInput1}`);
  const {btn} = props; 

  return (
          <Button variant="contained"  
                  size="large" 
                  onClick={(e) => setCalInput1(handleClick(e, btn))}>
            {btn.text}
          </Button>
          );
}

function ResultDisplay() {
  const {calInput1, calResult} = useContext(InputContext);  

  return (
          <Fragment>
            <Typography variant="h5" >
              {calInput1}
            </Typography>
            <Typography variant="h5" >
              ={calResult}
            </Typography>
          </Fragment>  
            );
}

export default App;
