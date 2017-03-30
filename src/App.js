import React, { Component } from 'react';
import logo from './logo.svg';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '/* jsx here */',
            output: '',
            err: '',
        }
    }

    update(e) {
        console.log(e);
        let code = e;
        try {
            this.setState({
                input: code,
                output: window.Babel
                    .transform(code, { presets: ['es2015', 'react']})
                    .code,
                err: ''
            })

        }
        catch (err) {
            this.setState({
                input: code,
                err: err.message
            })
        }
    }

    render() {
        let options_jsx = {
            lineNumbers: true,
            mode: 'jsx',
        };

        let options_javascript = {
            lineNumbers: true,
            readOnly: true,
            mode: 'javascript',
        };
        return (
          <div className="App">
            <div className="App-header">
                <div className="HeaderLogo"><img src={logo} className="App-logo" alt="logo" /></div><div className="HeaderTitle">JSX Live Compiler Tool</div>
            </div>
           <div>
               <div className="container">
                   <CodeMirror className="CodeMirror" value={this.state.input} onChange={this.update.bind(this)} options={options_jsx} />
                   <CodeMirror className="CodeMirror" value={this.state.output} options={options_javascript} />
               </div>
               <div className={this.state.err === '' ? "ErrorBox no-error" : "ErrorBox"}>
                   <pre>{this.state.err === '' ? "Everything is fine" : this.state.err}</pre>
               </div>
           </div>

          </div>
        );
    }
}

export default App;
