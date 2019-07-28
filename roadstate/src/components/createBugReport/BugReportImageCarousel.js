import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CarouselItem, Carousel,
} from 'react-bootstrap';

const photoLinks = [];

export default class BugReportImageCarousel extends React.Component {
  handleImageConvert = () => {
    const { photos } = this.props;
    while (photoLinks.length !== 0) {
      URL.revokeObjectURL(photoLinks[0]);
      photoLinks.splice(0, 1);
    }
    photos.map(photo => (
      photoLinks.push(URL.createObjectURL(photo))
    ));
  }

  render() {
    this.handleImageConvert();
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
