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

const backspace = function(str) {
  if(str.length > 0)
    return str.substring(0, str.length - 1);
  
  return '';  
};

const allowedOperation = ['%', '/', 'x', '-', '+', '='];

const clear = function() {
  return '0';
};

const result = function(str) {

  let calOutput = str;

  allowedOperation.forEach(function(value, index) {
    if(str.includes(value)) {
      const inputs = str.split(value);
      
      switch(value) {

        case '+' :
          calOutput = (parseInt(inputs[0]) + parseInt(inputs[1]));
          break;

        case '-' :
          calOutput = (parseInt(inputs[0]) - parseInt(inputs[1]));
          break;
          
        case '/' :
          calOutput = (parseInt(inputs[0]) / parseInt(inputs[1]));
          break;
          
        case 'x' :
          calOutput = (parseInt(inputs[0]) * parseInt(inputs[1]));
          break;

        default:
          break;
      }
    }
  });
  
  return calOutput;
}

const buttonText = [      [
                            {text : 'AC',  action : clear},
                            {text : <BackspaceIcon />,  action : backspace},
                            {text : '%'},
                            {text : '/'}
                          ],
                          [
                            {text : '7'},
                            {text : '8'},
                            {text : '9'},
                            {text : 'x'}
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
                            {text : <HistoryIcon/>, op : 'history'},
                            {text : '0'},
                            {text : '.'},
                            {text : '=', action : result}
                          ]                          
                  ];

const inputs = {
  calInput : '',
  calResult : '',
  setCalInput : '',
  setCalResult : ''
};

const InputContext = React.createContext(inputs);
                  

function handleClick(e, text, prevCalInput) {

  const strLength = prevCalInput.length;
  
  // if length is zero
  if((strLength === 0) && isFirstCharOperation(text.text)) 
    return '';  

  if(operationReTyped(text.text, prevCalInput))
    return prevCalInput;    
  
  return `${prevCalInput}${text.text}`;
}

function isFirstCharOperation(op) {
  return allowedOperation.includes(op)
}

function operationReTyped(userTyped, oldStr) {

  return (allowedOperation.includes(userTyped) && (allowedOperation.filter((value) => oldStr.includes(value)).length === 1));
}


function handleHistory()
{
  return '';
}

function App() {
  const [calInput, setCalInput] = useState('');
  const [calResult, setCalResult] = useState(0);
  const [myHistoryResult, setMyHistoryResult] = useState(0);

 

  return (
          <Container>
            <Card>
              <CardContent>
                <InputContext.Provider value={{calInput, setCalInput, 
                                               calResult, setCalResult, 
                                               myHistoryResult, setMyHistoryResult}}>
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
  let { setCalInput, calInput, 
          setCalResult, calResult, 
          myHistoryResult, setMyHistoryResult } = useContext(InputContext);
  const {btn} = props; 
  return (
          <Button variant="contained"  
                  size="large" 
                  onClick={(e) => {
                    if(btn.op) {
                      myHistoryResult = handleHistory();
                    }else if(btn.action){
                      
                      if((btn.action.name === 'clear') || (btn.action.name === 'backspace')){
                        calInput = btn.action(calInput);
                        if(btn.action.name === 'clear')
                          calResult = calInput;
                      }else{
                        calResult = btn.action(calInput);
                      }
                        
                    }else { 
                      calInput = handleClick(e, btn, calInput);                  
                    }
                    setCalInput(calInput);
                    setCalResult(calResult);
                    setMyHistoryResult(myHistoryResult);
                  }}>
            {btn.text}
          </Button>
          );
}

function ResultDisplay() {
  const {calInput, calResult} = useContext(InputContext);  

  return (
          <Fragment>
            <Typography variant="h5" >
              {calInput}
            </Typography>
            <Typography variant="h5" >
              {calResult}
            </Typography>
          </Fragment>  
            );
}

export default App;
