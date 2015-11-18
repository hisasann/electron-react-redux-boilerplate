import IndexComponent from './components/index-component';

var Index = React.createClass({
  getInitialState() {
    return {
    };
  },
  propTypes: {
  },
  getDefaultProps() {
    return {
    };
  },
  componentDidMount() {
  },
  render() {
    return (
      <div>
        <IndexComponent />
      </div>
    );
  }
});

var component = ReactDOM.render(
  <Index />,
  document.getElementById('contents')
);
console.log(2);
