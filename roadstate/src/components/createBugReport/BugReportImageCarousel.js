import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CarouselItem, Carousel,
} from 'react-bootstrap';

export default class BugReportImageCarousel extends React.Component {
  state = { photoLinks: [] }

  handleImageConvert = () => {
    const { photos } = this.props;
    const { photoLinks } = this.state;
    while (photoLinks.length !== 0) {
      URL.revokeObjectURL(photoLinks[0]);
      photoLinks.splice(0, 1);
    }
    photos.map(photo => (
      photoLinks.push(URL.createObjectURL(photo))
    ));
    this.setState(photoLinks);
  }

  componentDidUpdate = (nextProps) => {
    const { photos } = this.props;
    if (nextProps.photos !== photos) {
      this.handleImageConvert();
    }
  }

  render() {
    const { photoLinks } = this.state;
    return (
      <Carousel>
        {photoLinks.map(photoLink => (
          <CarouselItem>
            <Card>
              <Card.Img
                align="center"
                variant="top"
                src={photoLink}
                alt="Wait a moment!"
              />
            </Card>
          </CarouselItem>
        ))
        }
      </Carousel>
    );
  }
}

BugReportImageCarousel.propTypes = {
  photos: PropTypes.objectOf.isRequired,
};
