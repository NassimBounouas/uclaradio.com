// ShowContainer.jsx
// redux container for single show page component

import { connect } from 'react-redux';
import ShowPage from '../components/ShowPage.jsx';

import { fetchUpdatedShows } from '../actions/shows';

const mapStateToProps = (state, ownProps) => {
	var showID = Number(ownProps.params['showID']);
	return {
		show: state.shows.shows.find((show) => {
			return show.id === showID;
		}),
		fetching: state.shows.fetching
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateShows: () => {
		fetchUpdatedShows(dispatch);
	}
});

const ShowContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShowPage);

export default ShowContainer;