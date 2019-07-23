import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Carousel,
  CarouselItem,
  Row,
  Col,
  Button,
  Modal,
  Container,
  Form,
} from 'react-bootstrap';
import {
  FaThumbsUp, FaThumbsDown, FaCheck, FaStar, FaComment,
} from 'react-icons/fa';
import { Spinner } from '../../Spinner';
import * as bugReportActions from './actions';

export const NoPhotosAvailable = () => (
  <Card key="emptyImage" style={{ width: '25rem' }}>
    <Card.Img
      variant="top"
      src="https://scontent.fiev1-1.fna.fbcdn.net/v/t1.0-9/51760210_10155878999561389_7628714773646934016_o.jpg?_nc_cat=104&_nc_oc=AQnjSEe5kf53VvjoC-puvwwP7XsR6mDvPai2W5VoHhtyf12JtMgTaSeqNdEGf7iRXn8&_nc_ht=scontent.fiev1-1.fna&oh=5c3e1a8c2ef5521b95ce4e16e0fd9a79&oe=5DB35696"
      alt="No photos yet!"
    />
  </Card>
);

export const Photo = ({ photo }) => (
  <Card key={photo}>
    <Card.Img variant="top" src={photo} alt="Not downloaded yet:(" />
  </Card>
);

Photo.propTypes = {
  photo: PropTypes.string.isRequired,
};

export const Photos = ({ photos }) => (
  <Carousel>
    {photos.map(photo => (
      <CarouselItem>
        <Photo photo={photo} />
      </CarouselItem>
    ))}
  </Carousel>
);

Photos.propTypes = {
  photos: PropTypes.arrayOf.isRequired,
};

export const Comment = ({
  comment,
  handleLikeButton,
  disabledLikeButton,
  disabledDislikeButton,
}) => (
  <Card key={comment.id}>
    <Card.Header as="h5">{comment.userName}</Card.Header>
    <Card.Body>
      <Card.Text>{comment.text}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Row>
        <Col>
          <Button
            key={comment.id}
            variant="outline-success"
            onClick={handleLikeButton}
            value="true"
            id={comment.id}
            disabled={disabledLikeButton}
          >
            <FaThumbsUp />
          </Button>
          <span>{comment.likes}</span>
        </Col>
        <Col>
          <Button
            key={comment.id}
            variant="outline-danger"
            onClick={handleLikeButton}
            value="likeEnum.DISLIKE"
            id={comment.id}
            disabled={disabledDislikeButton}
          >
            <FaThumbsDown />
          </Button>
          <span>{comment.dislikes}</span>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

Comment.propTypes = {
  comment: PropTypes.objectOf.isRequired,
  handleLikeButton: PropTypes.func.isRequired,
  disabledLikeButton: PropTypes.bool.isRequired,
  disabledDislikeButton: PropTypes.bool.isRequired,
};

export const Comments = ({ comments, handleLikeButton }) => (
  <Container>
    {comments.map(comment => (
      <Comment
        comment={comment}
        handleLikeButton={handleLikeButton}
        disabledLikeButton="false"
        disabledDislikeButton="false"
      />
    ))}
  </Container>
);

Comments.propTypes = {
  comments: PropTypes.arrayOf.isRequired,
  handleLikeButton: PropTypes.func.isRequired,
};

export const NoComments = () => (
  <Card>
    <Card.Body>
      <Card.Title>No comments yet!</Card.Title>
    </Card.Body>
  </Card>
);

export const ModalCaller = ({ id, handleShow }) => (
  <Button variant="light" onClick={handleShow}>
    Info about bug report #
    {' '}
    {id}
  </Button>
);

ModalCaller.propTypes = {
  id: PropTypes.number.isRequired,
  handleShow: PropTypes.func.isRequired,
};

const Poll = ({
  id, handlePollButton, bugReport, loadingBugReportRating,
}) => (
  <Card>
    <Card.Header as="h6">Poll</Card.Header>
    <div>
      <BugReportRate
        handlePollButton={handlePollButton}
        id={id}
        bugReport={bugReport}
        loadingBugReportRating={loadingBugReportRating}
      />
    </div>
  </Card>
);

Poll.propTypes = {
  id: PropTypes.number,
  handlePollButton: PropTypes.func.isRequired,
  bugReport: PropTypes.objectOf(PropTypes.any),
  loadingBugReportRating: PropTypes.bool,
};

Poll.defaultProps = {
  id: 0,
  bugReport: null,
  loadingBugReportRating: false,
};

const BugReportRate = ({
  bugReport, handlePollButton, id, loadingBugReportRating,
}) => {
  if (loadingBugReportRating) {
    return (
      <Row>
        <Col md={{ offset: 5 }}>
          <Spinner />
        </Col>
      </Row>
    );
  }
  if (!bugReport.userRate) {
    return <BugReportUnrated handlePollButton={handlePollButton} id={id} />;
  }
  return <BugReportRated bugReport={bugReport} />;
};

BugReportRate.propTypes = {
  id: PropTypes.number.isRequired,
  handlePollButton: PropTypes.func.isRequired,
  bugReport: PropTypes.objectOf(PropTypes.any),
  loadingBugReportRating: PropTypes.bool,
};

BugReportRate.defaultProps = {
  bugReport: null,
  loadingBugReportRating: false,
};

const BugReportRated = ({ bugReport }) => (
  <Row>
    <Col md={{ offset: 3 }}>
      {bugReport.userRate === 'agree' ? (
        <p>You agreed with this bug report!</p>
      ) : (
        <p>You disagreed with this bug report!</p>
      )}
    </Col>
  </Row>
);

BugReportRated.propTypes = {
  bugReport: PropTypes.objectOf(PropTypes.any),
};

BugReportRated.defaultProps = {
  bugReport: null,
};

const BugReportUnrated = ({ handlePollButton, id }) => (
  <div>
    <Card.Body>
      <Card.Text>Is this problem true?</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Container>
        <Row>
          <Col>
            <Button variant="success" onClick={handlePollButton} value="true" id={id}>
              Yes
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handlePollButton} value="false" id={id}>
              No
            </Button>
          </Col>
        </Row>
      </Container>
    </Card.Footer>
  </div>
);

BugReportUnrated.propTypes = {
  id: PropTypes.number.isRequired,
  handlePollButton: PropTypes.func.isRequired,
};

export const Description = ({ description }) => (
  <Card>
    <Card.Header as="h6">Description</Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export const Information = ({ state, rating, commentsCount }) => (
  <Card>
    <Card.Header as="h6">Information</Card.Header>
    <Card.Body>
      <Row>
        <Col md={1}>
          <FaCheck />
        </Col>
        <Col>
          Status:
          {state}
        </Col>
      </Row>
      <Row>
        <Col md={1}>
          <FaStar />
        </Col>
        <Col>
          Rating:
          {+rating.toFixed(2)}
        </Col>
      </Row>
      <Row>
        <Col md={1}>
          <FaComment />
        </Col>
        <Col>
          Comments:
          {commentsCount}
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

Information.propTypes = {
  state: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

export const BodyContainer = ({
  description, state, rating, commentsCount,
}) => (
  <Container>
    <Row>
      <Col md={{ offset: 0, span: 5 }}>
        <Description description={description} />
      </Col>
      <Col md={{ offset: -1, span: 6 }}>
        <Information state={state} rating={rating} commentsCount={commentsCount} />
      </Col>
    </Row>
  </Container>
);

BodyContainer.propTypes = {
  description: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

export const CommentForm = ({ handleSubmit, handleChange }) => (
  <Card className="w-100">
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentInput">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your comment"
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="btn-primary" type="submit">
          Add comment
        </Button>
      </Form>
    </Card.Body>
  </Card>
);

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

class BugReport extends React.Component {
  state = {
    isModalOpened: false,
  };

  static propTypes = {
    loadingBugReport: PropTypes.bool.isRequired,
    loadingBugReportRating: PropTypes.bool.isRequired,
    bugReport: PropTypes.objectOf(PropTypes.any),
    rateBugReport: PropTypes.func.isRequired,
    loadBugReport: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadBugReport } = this.props;
    loadBugReport(1);
  }

  handleShow = () => {
    this.setState({ isModalOpened: true });
  };

  handleClose = () => {
    this.setState({ isModalOpened: false });
  };

  handlePoll = (event) => {
    const { bugReport, rateBugReport } = this.props;
    const { currentBugReport } = bugReport;
    const currentRating = currentBugReport.rating;
    const bugReportDispatched = {
      ...currentBugReport,
      rating: event.target.value === 'true' ? currentRating + 1 : currentRating - 1,
    };
    const rate = event.target.value === 'true' ? 'agree' : 'disagree';
    rateBugReport(bugReportDispatched, rate);
  };

  handleCommentChange = (event) => {}

  render() {
    const { isModalOpened } = this.state;
    const { bugReport } = this.props;
    const { currentBugReport, loadingBugReport, loadingBugReportRating } = bugReport;
    if (loadingBugReport || !currentBugReport) {
      return (
        <Row>
          <Col md={{ offset: 5 }}>
            <Spinner />
          </Col>
        </Row>
      );
    }
    return (
      <Container>
        <ModalCaller id={currentBugReport.id} handleShow={this.handleShow} />
        <Modal show={isModalOpened} onHide={this.handleClose} size="lg">
          <Modal.Dialog scrollable size="lg">
            <Modal.Header>
              <NoPhotosAvailable />
            </Modal.Header>
            <Modal.Body>
              <Poll
                handlePollButton={this.handlePoll}
                bugReport={currentBugReport}
                user={null}
                loadingBugReportRating={loadingBugReportRating}
              />
              <br />
              <BodyContainer
                description={currentBugReport.description}
                state={currentBugReport.state}
                rating={!currentBugReport ? 0 : currentBugReport.rating}
                commentsCount={0}
              />
              <br />
              <NoComments />
            </Modal.Body>
            <Modal.Footer>
              <CommentForm handleChange={this.handleCommentChange} handleSubmit={this.handleCommentChange} />
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </Container>
    );
  }
}

BugReport.defaultProps = {
  bugReport: null,
};

const mapStateToProps = ({ bugReport }) => ({ bugReport });

const mapDispatchToProps = {
  loadBugReport: bugReportActions.loadBugReport,
  rateBugReport: bugReportActions.rateBugReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BugReport);
