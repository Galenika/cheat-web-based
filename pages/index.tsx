import React, { useEffect } from "react";
import Link from "next/link";
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import { response } from "express";


interface inputState {
    value: string
}

export default class Index extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {input: '', input1: '', input2: '', value: 0, value1: 0, value2: 0};

        // bind this to be able to access the variable. (input)
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange.bind(this);
        
    }

    handleChange(event: any) {this.setState({input: event.target.value}); }
    handleChange1(event: any) {this.setState({input1: event.target.value}); }
    handleChange2(event: any) {this.setState({input2: event.target.value}); }

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



    toggleFeature = () => {
        console.log("feature: " + this.state.input + " value: " + this.state.value);
       fetch("http://localhost:3002/toggleFeature", {
           method: "POST",
           mode: "cors",
           cache: "no-cache",
           body: JSON.stringify({uid: 1, features: this.state.input, value: this.state.value}), // uid hardcoded for testing purposes
           headers: {"Content-Type": "application/json"}
       }).then(response => response.json()
         .then(data => console.log(data)))
         .catch(rejected => {
            console.log("Error sending request to server: " + rejected);
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
                            <input value={this.state.input} onChange={this.handleChange} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-4" placeholder="feature name"/>
                            <p>Value: {this.state.value}</p>
                            <Slider step={1} defaultValue={0} value={this.state.value} onChange={this.onSliderChange} />

                            <input value={this.state.input} onChange={this.handleChange1} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-4" placeholder="feature name"/>
                            <p>Value: {this.state.value1}</p>
                            <Slider step={1} defaultValue={0} value={this.state.value1} onChange={this.onSliderChange1} />

                            <input value={this.state.input} onChange={this.handleChange2} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-4" placeholder="feature name"/>
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