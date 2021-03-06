// UserEditableDateTimeField.js

import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

/**
*  Allows user to confirm a button submission
*
*  @prop confirm: text to display on button when confirming
*  @prop submit: text to display on button when submitting
*  @prop onSubmit -> function(): parent's function to call when submitting
*/
const ConfirmationButton = React.createClass({
  getInitialState() {
    return { unlock: false };
  },
  toggleUnlock() {
    this.setState({ unlock: !this.state.unlock });
  },
  render() {
    return (
      <div className="confirmationButton centered">
        {this.state.unlock ? (
          <ButtonGroup>
            <Button className="delete" onClick={this.props.onSubmit}>
              {this.props.submit}
            </Button>
            <Button onClick={this.toggleUnlock}>Cancel</Button>
          </ButtonGroup>
        ) : (
          <Button className="delete" onClick={this.toggleUnlock}>
            {this.props.confirm}
          </Button>
        )}
      </div>
    );
  },
});

export default ConfirmationButton;
