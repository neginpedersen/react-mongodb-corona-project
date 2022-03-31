import React, { Component } from "react";
import { CountryDropdown } from 'react-country-region-selector';

export default class CountrySelector extends Component {

constructor(props) {
    super(props)
    this.state = {
      country: ''
    }
    this.handleSelect = this.handleSelect.bind(this);


  }
  handleSelect(country) {
      this.props.onCountryselect(country);
    }


  render() {
  return (<CountryDropdown onChange={this.handleSelect} />)
  }
}
