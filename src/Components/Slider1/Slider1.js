import React, {Component} from 'react';

import './Slider1.css'

class Slider1 extends Component {

    constructor(props) {
        debugger;
        super();
        this.state = {
            images: props.images,
            currentImageIndex: props.index,
            isCycleMode: false,
            cantGoPrev: props.index >0,
            cantGoNext: props.index < props.index.length -1
        }
        this.nextSlideHandler = this.nextSlideHandler.bind(this)
    }

    _makeNextStep(currentIndex) {
        let newIndex = currentIndex;

        if (currentIndex < this.state.images.length - 1) {
            newIndex = this.state.currentImageIndex + 1;
            this.setState({
                cantGoPrev: true
            });
        }
        if (newIndex === this.state.images.length - 1) {
            this.setState({
                cantGoNext: false
            });
        }
        return newIndex;

    }

    _makePrevStep(currentIndex) {
        let newIndex = currentIndex;
        if (newIndex > 0) {
            newIndex = this.state.currentImageIndex - 1;
            this.setState({
                cantGoNext: true
            });
            if (newIndex === 0) {
                this.setState({
                    cantGoPrev: false
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
            <div class="slider1">
                <div>
                    <button disabled={!this.state.cantGoPrev} data-direction="prev"
                            onClick={this.nextSlideHandler.bind(this)}>prev
                    </button>
                </div>
                <div>
                    <img class="slider1-img" src={this.state.images[this.state.currentImageIndex]} alt=""/>
                    {this.state.currentImageIndex}
                </div>
                <div>
                    <button disabled={!this.state.cantGoNext} data-direction="next"
                            onClick={this.nextSlideHandler.bind(this)}>next
                    </button>

                </div>

            </div>
        );
    }
}

export default Slider1;
