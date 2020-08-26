// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";
import H3 from "../../ui/typography/H3";
import H4 from "../../ui/typography/H4";
import { white, grey } from "../../ui/common/colors";

// App Imports
import { messageShow, messageHide } from "../common/api/actions";
import { setUserStylePreference } from "./api/actions";

// Component
class StyleSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      isLoading: false,
      styleChoices: {},
    };
  }

  onChange = (event) => {
    let styleChoices = this.state.styleChoices;
    styleChoices[event.target.name] = event.target.value;

    this.setState({ styleChoices });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // Call a post request with the user's email and array of strings of styleChoices
    // this.props.setUserStylePreference(this.props.user.email, Object.values(this.state.styleChoices))
    this.setState({
      isLoading: true,
    });
  };

  makeRadioBtns = () => {
    const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "Dress"];
    return categories.map((category, i) => {
      return (
        <section>
          {category}
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="edgy"
            key={i + "edgy" + category }
          />{" "}
          Edgy
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="professional"
            key={i + "professional" + category}
          />{" "}
          Professional
          <input
            onChange={this.onChange}
            type="radio"
            name={category}
            value="casual"
            key={i + "casual" +  category }

          />{" "}
          Casual
        </section>
      );
    });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>My Style Survey </title>
        </Helmet>
        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H3 font="secondary">My Style Survey</H3>
          </GridCell>
        </Grid>
        <Grid>
          <GridCell style={{ padding: "2em", textAlign: "center" }}>
            <H4 style={{ marginBottom: "0.5em" }}>
              NAME, you don't have a style preference yet.
              <br /> Please fill out this survey to determine your style
              preference.
            </H4>
            {this.makeRadioBtns()}
        <button onClick={this.onSubmit}>SUBMIT</button>
          </GridCell>
        </Grid>
      </div>
    );
  }
}

function profileState(state) {
  return {
    user: state.user
  }
}

// Component Properties
StyleSurvey.propTypes = {};

export default connect(profileState, { setUserStylePreference, messageShow, messageHide })(
  withRouter(StyleSurvey)
);
