import React from 'react';
import PropTypes from 'prop-types';

class Spinner extends React.Component {
  state = { frame: 1 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        frame: prevState.frame + 1,
      }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots--;
    }
    return (
      <h3 className="bg-info text-white font-weight-bold">{text}&nbsp;</h3>
    );
  }
}

Spinner.defaultProps = {
  interval: 300,
  dots: 3
};

Spinner.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default Spinner;
