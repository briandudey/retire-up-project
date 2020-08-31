import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import 'rc-tooltip/assets/bootstrap_white.css';

//Required for display of tooltip
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

//This component determines the date ranges to be displayed

export default class RangeSlider extends React.Component {
    state = { sliderValues: [1926, 2020] };

    handleChange = sliderValues => {
        this.setState({ sliderValues }, () => {
            if(this.props.onChange) {
                this.props.onChange(this.state);
            }
        });
    };

    render() {
        const { sliderValues } = this.state;
        return (
            <div>
                {sliderValues[0]} - {sliderValues[1]}
                <Range
                    min={1926}
                    max={2020}
                    onChange={this.handleChange}
                    defaultValue={sliderValues}
                    tipFormatter={value => `${value}`}
                    tipProps={{visible: true}}
                />
            </div>
        );
    }
}