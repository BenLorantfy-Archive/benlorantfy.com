'use strict';
var React = require('react');

var Util = require('./util');
var Layout = require('./layout');
var Depot = require('./depot');

var Carousel = React.createClass({
    displayName: 'Carousel',

    getInitialState: function getInitialState() {
        return {
            images: this.props.images,
            figures: Layout[this.props.layout].figures(this.props.width, this.props.images, 0),
            rotationY: 0,
            counter: 0,
        };
    },
    componentWillMount: function componentWillMount() {
        this.depot = Depot(this.getInitialState(), this.props, this.setState.bind(this));
        this.onRotate = this.depot.onRotate.bind(this);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.depot.onNextProps(nextProps);
    },
    render: function render() {
        var angle = 2 * Math.PI / this.state.figures.length;
        var translateZ = -Layout[this.props.layout].distance(this.props.width, this.state.figures.length);
        var figures = this.state.figures.map(function (d, i) {
            return React.createElement(
                'figure',
                { key: i, style: Util.figureStyle(d) },
                React.createElement('div', { 
                    alt: i, 
                    style: {
                        height: '100%', 
                        width: '100%',
                        backgroundSize: "cover",
                        backgroundPosition:"left center",
                        backgroundImage: `url(${d.image})`,  
                    }
                })
            );
        });
        return React.createElement(
            'section',
            { className: 'react-3d-carousel' },
            React.createElement(
                'div',
                { className: 'carousel',
                    style: { transform: 'translateZ(' + translateZ + 'px)' } },
                figures
            ),
            React.createElement('div', { className: 'prev', onClick: () => { this.props.onChange(1); Util.partial(this.onRotate, +angle)(); } }),
            React.createElement('div', { className: 'next', onClick: () => { this.props.onChange(-1); Util.partial(this.onRotate, -angle)(); } })
        );
    }
});
module.exports = Carousel;