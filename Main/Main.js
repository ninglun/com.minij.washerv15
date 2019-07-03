import { connect } from 'react-redux';
import AppNavigator from '../Redux/AppNavigator';
import { reduxifyNavigator } from "react-navigation-redux-helpers";

const Main = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (store) => ({
    state: store.navReducer
});

export default connect(mapStateToProps)(Main);