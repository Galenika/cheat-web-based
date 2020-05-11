import React, { useEffect } from "react";
import Link from "next/link";
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { response } from "express";
import Swal from 'sweetalert2'
import { getRedirectStatus } from "next/dist/lib/check-custom-routes";
import { json } from "body-parser";


export default class Index extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);

        // add every feature to state
        this.state = {input: '', input1: '', input2: '', value: 0, value1: 0, value2: 0};

        // bind this to be able to access the variable. (input)
        this.handleChange = this.handleChange.bind(this);
        
    }

    // handles input change for all 3 example inputs
    handleChange (evt: { target: { name: any; value: any; }; }) {
        this.setState({ [evt.target.name]: evt.target.value });
      }



    // changes the variables to the corrosponding event => state whenever a slider value is changed.
    onSliderChange = (value: any) => {
        this.setState({
          value: value,
        });
      };

      onSliderChange1 = (value: any) => {
        this.setState({
          value1: value,
        });
      };

      onSliderChange2 = (value: any) => {
        this.setState({
          value2: value,
        });
      };

    
    // sends the request to the backend when pressing the save button.
    toggleFeature = () => {
        let rcode = true;
        let rstatus = 0;
        //const features = JSON.parse(`{  ${this.state.input} {"value": ${this.state.value}} }`);
        // converting all input/slider values into a json to send it to the server.
        const features = `{
            "${this.state.input}": {
                "value": ${this.state.value}
            },
            "${this.state.input1}": {
                "value": ${this.state.value1}
            },
            "${this.state.input2}": {
                "value": ${this.state.value2}
            }
        }`
       fetch("http://localhost:3002/toggleFeature", {
           method: "POST",
           mode: "cors",
           cache: "no-cache",
           body: JSON.stringify({uid: 1, features: features, value: this.state.value}), // uid hardcoded for testing purposes
           headers: {"Content-Type": "application/json"}
        })
         .then(response => {
             if(!response.ok) {
                 rcode = false;
             }
             rstatus = response.status;

             return response.json();
         })
         .then(data => {
             console.log(data);
            if(!rcode) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                    text: 'Response: ' + JSON.stringify(data["message"]),
                    footer: 'Error code: ' + rstatus
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    text: 'Response: ' + JSON.stringify(data["message"]),
                    footer: 'Failures: ' + JSON.stringify(data["failures"])
                });
            }
         })
         .catch(rejected => {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong sending the request to the server!',
                text: 'Error: ' + rejected, 
            });
        });
    }

    render() {
        return (
            <div className="App select-none">
                <div id="wrapper" className="h-full w-full bg-cover bg-gray-900">
                    <div id="container" className="flex flex-col  relative md:flex-row justify-between items-start px-32 py-32">
                        <div style={{zIndex: 9999}} id="overlay" className="bg-gray-400 rounded-lg p-4  shadow-2xl">

                            <div id="text" className="py-4">
                                <h1 className="text-lg text-black">Cloud based cheat front/backend</h1>
                            
                            </div>

                            <div id="sliders" className="py-24">
                            <input name="input" value={this.state.input} onChange={this.handleChange} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-4" placeholder="feature name"/>
                            <p>Value: {this.state.value}</p>
                            <Slider step={1} defaultValue={0} value={this.state.value} onChange={this.onSliderChange} />

                            <input name="input1" value={this.state.input1} onChange={this.handleChange} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-4" placeholder="feature name"/>
                            <p>Value: {this.state.value1}</p>
                            <Slider step={1} defaultValue={0} value={this.state.value1} onChange={this.onSliderChange1} />

                            <input name="input2" value={this.state.input2} onChange={this.handleChange} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-4" placeholder="feature name"/>
                            <p>Value: {this.state.value2}</p>
                            <Slider step={1} defaultValue={0} value={this.state.value2} onChange={this.onSliderChange2} />

                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4" onClick={this.toggleFeature}>
                                Save
                            </button>

                            </div>

                            <div id="footer">
                                <h1 className="text-xs text-black">made by raizo#0001</h1> 
                            </div>
                        
                        </div>
                    
                    </div>
                </div>

            </div>
        )
    }



}