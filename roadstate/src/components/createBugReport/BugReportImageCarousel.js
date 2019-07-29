import React, { useEffect } from 'react';
import {
  Card, CarouselItem, Carousel,
} from 'react-bootstrap';

const photoLinks = [];

const BugReportImageCarousel = (photos) => {
  useEffect(() => {
    while (photoLinks.length !== 0) {
      URL.revokeObjectURL(photoLinks[0]);
      photoLinks.splice(0, 1);
    }
    photos.map(photo => (
      photoLinks.push(URL.createObjectURL(photo))
    ));
  }, [photos]);

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
      ))}
    </Carousel>
  );
};

export default BugReportImageCarousel;
