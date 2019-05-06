import React, {Component} from 'react';

import './Slider1.css'

class Slider1 extends Component {

    constructor(props) {
        super();
        this.state = {
            images: props.images,
            currentImageIndex: props.index,
            isCycleMode: false,
            canGoPrev: props.index > 0,
            canGoNext: props.index < props.images.length -1
        }
        this.nextSlideHandler = this.nextSlideHandler.bind(this)
    }

    _makeNextStep(currentIndex) {
        let newIndex = currentIndex;

        if (currentIndex < this.state.images.length - 1) {
            newIndex = this.state.currentImageIndex + 1;
            this.setState({
                canGoPrev: true
            });
        }
        if (newIndex === this.state.images.length - 1) {
            this.setState({
                canGoNext: false
            });
        }
        return newIndex;

    }

    _makePrevStep(currentIndex) {
        let newIndex = currentIndex;
        if (newIndex > 0) {
            newIndex = this.state.currentImageIndex - 1;
            this.setState({
                canGoNext: true
            });
            if (newIndex === 0) {
                this.setState({
                    canGoPrev: false
                });
            }
            return newIndex;
        }
    }

    nextSlideHandler(e) {
        let currentIndex = this.state.currentImageIndex;
        let newIndex = currentIndex;

        if (e.currentTarget.dataset.direction === "next") {
            newIndex = this._makeNextStep(currentIndex);

        } else {
            newIndex = this._makePrevStep(currentIndex);

        }
        this.setState({currentImageIndex: newIndex})
    }

    render() {
        return (
            <div className="slider1">
                <div>
                    <button disabled={!this.state.canGoPrev} data-direction="prev"
                            onClick={this.nextSlideHandler.bind(this)}>prev
                    </button>
                </div>
                <div>
                    <img className="slider1-img" src={this.state.images[this.state.currentImageIndex]} alt=""/>
                    {this.state.currentImageIndex}
                </div>
                <div>
                    <button disabled={!this.state.canGoNext} data-direction="next"
                            onClick={this.nextSlideHandler.bind(this)}>next
                    </button>

                </div>

            </div>
        );
    }
}

export default Slider1;
