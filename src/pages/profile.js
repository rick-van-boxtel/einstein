// Import React and React Router DOM to use components and link pages
import React, { Component } from 'react';

// Import PropTypes to typecheck a component
import PropTypes from 'prop-types';

// Import React components and utility
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import PostScream from "../components/scream/PostScream";
import Profile from "../components/profile/Profile";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

// Import Redux library to read/store data from the database
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container>
          <Profile />
          {screamsMarkup}
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);






