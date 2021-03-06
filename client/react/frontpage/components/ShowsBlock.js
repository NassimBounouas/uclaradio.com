// ShowsGraph.js
// graph selector with schedule of shows

import React from 'react';
import Dates from '../../common/Dates';
import './ShowsBlock.scss';

const week = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

/*
Full graph with schedule of shows

@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
@prop schedule: show schedule data object:
  {
    "sunday": {9: {show}, ...},
    ...
    "saturday": {11: {show}, ...},
  }
*/
const ShowsGraph = React.createClass({
  getInitialState() {
    return {
      activeShowID: -1,
    };
  },
  toggleActiveShow(showID) {
    this.setState({ activeShowID: showID });
  },
  render() {
    const dayTitles = week.map(day => <p>{Dates.abbreviatedDay(day)}</p>);

    let showBlocks = '';
    for (var hour = 0; hour < 24; hour++) {
      const hourString = Dates.availableTimes[hour];
      showBlocks += (
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            width: '100%',
            margin: '0 auto',
          }}>
          <p className="timeStyle">{hourString}</p>
          {week.map(day => {
            const show = this.props.schedule[day][hour];
            showBlocks += (
              <ShowBlock
                isValidShow={show !== null}
                isCurrentShow={show && show.id === this.props.currentShowID}
                isActiveShow={show && show.id === this.state.activeShowID}
                isSpotlightShow={show && show.id === this.props.spotlightShowID}
                handleClick={() => {
                  show && this.toggleActiveShow(show.id);
                }}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="showsGraph">
        {dayTitles}
        {showBlocks}
      </div>
    );
  },
});

/*
Individual show block with rollover action

@prop handleClick: callback for mouse click action
@prop isValidShow: styling bool -> overwrites isCurrentShow and isSpotlightShow if false
@prop isCurrentShow: styling bool: this show is currently playing
@prop isActiveShow: styling bool: user clicked on this show
@prop isSpotlightShow: styling bool: show is a spotlight feature on website
*/
const ShowBlock = React.createClass({
  handleMouseOver() {
    this.setState({ active: true });
  },
  handleMouseOut() {
    this.setState({ active: false });
  },
  handleClick() {
    this.props.handleClick();
  },
  render() {
    if (!this.props.isValidShow) {
      const boringBlockStyle = {
        backgroundColor: 'white',
      };
      return <div className="showBlock" style={boringBlockStyle} />;
    }
    const blockColor =
      (this.props.isCurrentShow && '#3c84cc') ||
      (this.props.isSpotlightShow && 'purple') ||
      'yellow';

    const blockStyle = {
      backgroundColor: blockColor,
    };
    return (
      <div
        className="showBlock"
        style={blockStyle}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      />
    );
  },
});

export default ShowsGraph;
