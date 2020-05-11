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

        this.state = {value: 0, input: ''};

        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event: any) {this.setState({input: event.target.value}); }



    svalue: 0 = 0;

    onSliderChange = (value: any) => {
        this.svalue = value;
        this.setState({
          value,
        });
      };


    toggleFeature = () => {
        console.log("feature: " + this.state.input + " value: " + this.svalue);
       fetch("http://localhost:3002/toggleFeature", {
           method: "POST",
           mode: "cors",
           cache: "no-cache",
           body: JSON.stringify({uid: 1, feature: this.state.input, value: this.svalue}), // uid hardcoded for testing purposes
           headers: {"Content-Type": "application/json"}
       }).then(response => response.json()
         .then(data => console.log(data)))
         .catch(rejected => {
            console.log(rejected);
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
                            <p>Value: {this.svalue}</p>
                            <Slider step={1} defaultValue={0} value={this.svalue} onChange={this.onSliderChange} />

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