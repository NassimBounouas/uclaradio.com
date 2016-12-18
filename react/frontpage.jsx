// frontpage.jsx
// Radio Front Page

import React from 'react';
import ReactDOM from 'react-dom';
// React-Router
import { Router, Route, IndexRoute, browserHistory, IndexLink } from 'react-router';
// Redux / React-Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './frontpage/reducers/';

const store = createStore(reducer);

// FrontPage Elements
import TriangleCanvas from './frontpage/components/TriangleCanvas.jsx';
import FrontPageNavbar from './frontpage/components/FrontPageNavbar.jsx';
import StreamBar from './frontpage/components/StreamBar.jsx';
import LiveShowInfo from './frontpage/components/LiveShowInfo.jsx';
import WaterFallContent from './frontpage/components/WaterFallContent.jsx';
import DJList from './frontpage/components/DJList.jsx';
import EventsTab from './frontpage/components/EventsTab.jsx';

// Common Elements
import RectImage from './common/RectImage.jsx';

// Bootstrap elements
import { Bootstrap, Grid, Col } from 'react-bootstrap';

// Custom
import theme from './common/theme';

// styling
require('./frontpage/frontpage.scss');

var nowPlayingURL = "/api/nowplaying";

var FrontPage = React.createClass({
  getInitialState: function() {
    return {
      show: null
    };
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  componentDidMount: function() {
    this.updateNowPlaying();
    // refresh tracks every 30 seconds
    this.interval = setInterval(this.updateNowPlaying, 30*1000);
  },
  updateNowPlaying: function() {
    $.ajax({
      url: nowPlayingURL,
      dataType: 'json',
      cache: false,
      success: function(nowPlaying) {
        this.setState({show: nowPlaying});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({show: null});
        console.error(nowPlayingURL, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var showShow = this.state.show && this.state.show.title != null;
    return (
      <div className="frontPage">
        <TriangleCanvas xColors={theme.timezoneColorScheme()}>
          <div class="container" id="main">
            <Grid>

              <Col xs={12} md={3} className="frontpageCol">
                <IndexLink to="/beta" activeClassName="active">
                  <div className="radioBanner">
                    <RectImage maxWidth="350px"
                      src="/img/uclaradio-white.png" />
                  </div>
                </IndexLink>
                <LiveShowInfo show={showShow ? this.state.show : null} title="Now Playing" />
                <div className="radioInfo">
                  <p>UCLA Radio is an entirely student-run radio station. We broadcast all day, every day from a secret cave in Ackerman Student Union.</p>
                </div>
              </Col>

              <Col xs={12} md={9} className="frontpageCol">
                <div className="promoBanner">
                  <RectImage src="/img/sotm_november_2016.png" aspectRatio={5} />
                </div>
                <FrontPageNavbar />
                { this.props.children }
              </Col>

            </Grid>
          </div>
        <StreamBar currentShowTitle={showShow ? this.state.show.title : null} />
        </TriangleCanvas>
      </div>
    )
  }
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/beta" component={FrontPage}>
        <IndexRoute component={WaterFallContent} />
        <Route path="/beta/djs" component={DJList} />
        <Route path="/beta/events" component={EventsTab} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('content'))
