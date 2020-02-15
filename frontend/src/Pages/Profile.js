import React from 'react';
import { connect } from 'react-redux';
import { ApiService } from 'services';
import { UserAction } from 'actions';

class Profile extends React.Component {
  constructor() {
    // State for showing/hiding components when the API (blockchain) request is loading
    this.state = {
      loading: true,
    };
    // Bind functions
    this.loadUser = this.loadUser.bind(this);
    this.handlePatientAccess = this.handleSignForAccess.bind(this);
    // Call `loadUser` before mounting the app
    this.loadUser();
  }

  // Get latest user object from blockchain
  loadUser() {
    // Extract `setUser` of `UserAction` and `user.name` of UserReducer from redux
    const { setUser, user: { name } } = this.props;
    // Send request the blockchain by calling the ApiService,
    // Get the user object and store the `win_count`, `lost_count` and `game_data` object
    return ApiService.getUserByName(name).then(user => {
      setUser({
        patient_id: user.patient_id,
      });
      // Set the loading state to false for displaying the app
      this.setState({ loading: false });
    });
  }

  handleAccessPatientData(patient_id) {
    // Send a request to API (blockchain) to start game
    // And call `loadUser` again for react to render latest game status to UI
    return ApiService.accessPatientData(patient_id).then(()=>{
      return this.loadUser();
    });
  }

  render() {
    // Extract data from state and user data of `UserReducer` from redux
    const { loading } = this.state;
    const { user: { name, patient_id } } = this.props;

    return (
      <div>

      </div>
    );
  }

}

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setUser: UserAction.setUser,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
