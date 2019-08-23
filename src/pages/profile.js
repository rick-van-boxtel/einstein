// Import React and React Router DOM to use components and link pages
import React, { Component } from "react";

// Import PropTypes to typecheck a component
import PropTypes from "prop-types";

// Import React components and utility
import Scream from "../components/scream/Scream";
import ScreamSkeleton from "../util/ScreamSkeleton";
import PostScream from "../components/scream/PostScream";
import Profile from "../components/profile/Profile";
import Grid from "@material-ui/core/Grid";

import axios from 'axios';

// Import Redux library to read/store data from the database
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class profile extends Component {
  render() {
    const { screams, loading } = this.props.data;

    return (
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <PostScream />
      </Grid>
    );
  }
}

// Typcheck components
profile.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

// Select data from the store to export to other files later
const mapStateToProps = state => ({
  data: state.data
});

// Export data
export default connect(
  mapStateToProps,
  { getScreams }
)(profile);