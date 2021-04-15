import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { grey, lightBlue } from '@material-ui/core/colors';
import MomentUtils from '@date-io/moment';
import { NavContextProvider } from './components/context/nav';
import { AuthContextProvider } from './components/context/auth';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    input: {
      border: {
        unfocused: string;
        focused: string;
        transition: string;
      }
    }
  }

  interface ThemeOptions {
    input?: {
      border?: {
        unfocused?: string;
        focused?: string;
        transition?: string;
      }
    }
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[400],
      contrastText: "#fff"
    },
    secondary: {
      main: "#fff",
      contrastText: grey[800]
    },
  },
  input: {
    border: {
      unfocused: "2px solid " + grey[400],
      focused: "2px solid " + lightBlue[400],
      transition: "border .5s",
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <NavContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </NavContextProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
