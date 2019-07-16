import React from 'react';
import * as bugReportActions from './actions';
import * as userActions from '../user/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import {
  Card,
  Carousel,
  CarouselItem,
  Row,
  Col,
  Button,
  Modal,
  Container,
  Form
} from 'react-bootstrap';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCheck,
  FaStar,
  FaComment
} from 'react-icons/fa';

const likeEnum = {
  LIKE: true,
  DISLIKE: false
};
const agreeEnum = {
  AGREE: true,
  DISAGREE: false
};
export const roadStateConstant = 0.1;

class BugReport extends React.Component {
  componentDidMount = async () => {
    const { bugReportActions, userActions } = this.props;
    await bugReportActions.loadBugReportAsync(1);
    await userActions.loadUserAsync('da39a3ee5e6b4b0d3255bfef95601890afd80709');
    const { bugReport, user } = this.props;
    const { comment } = this.state;
    const bugReportClone = JSON.parse(JSON.stringify(bugReport));
    const userClone = JSON.parse(JSON.stringify(user));
    this.setState({
      bugReport: { ...bugReportClone }
    });
    const currentCommentId =
      !bugReport.comments || bugReport.comments.length === 0
        ? 1
        : Math.max(...bugReport.comments.map(x => x.id)) + 1;
    this.setState({
      comment: {
        ...comment,
        id: currentCommentId,
        userName: user.userName
      }
    });
    this.setState({
      user: { ...userClone }
    });
  };

  componentDidUpdate = () => {};

  state = {
    bugReport: {
      id: null,
      photos: [],
      comments: [],
      state: '',
      rating: null,
      description: '',
      location: {
        x: null,
        y: null
      }
    },
    comment: {
      id: null,
      userName: '',
      text: '',
      likes: 0,
      dislikes: 0
    },
    isModalOpened: false,
    user: {
      id: '',
      userName: '',
      defaultLocation: [],
      registrationDate: '1971-01-01',
      pollList: [],
      likeList: []
    }
  };

  handleLikeButton = event => {
    const likeEnumValue = event.currentTarget.value === 'true';
    const currentCommentId = +event.currentTarget.id;
    const { bugReport, user } = this.state;
    let newComments;
    switch (likeEnumValue) {
      case likeEnum['LIKE']:
        newComments = bugReport.comments.map(comment =>
          comment.id === currentCommentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        );
        break;
      case likeEnum['DISLIKE']:
        newComments = bugReport.comments.map(comment =>
          comment.id === currentCommentId
            ? { ...comment, dislikes: comment.dislikes + 1 }
            : comment
        );
        break;
      default:
        alert('Invalid button handler');
        break;
    }
    if (didUserLiked(user, currentCommentId, !likeEnumValue)) {
      newComments = newComments.map(x =>
        x.id === currentCommentId ? rollbackLike(x, !likeEnumValue) : x
      );
    }
    this.setState({
      bugReport: { ...bugReport, comments: [...[], ...newComments] }
    });
    const newUserLike = {
      id: currentCommentId,
      likeValue: likeEnumValue
    };
    this.setState({
      user: {
        ...user,
        likeList: [...user.likeList, newUserLike]
      }
    });
  };

  handleAgreeButton = event => {
    const agreeValue = event.currentTarget.value === 'true';
    const id = +event.currentTarget.id;
    const { bugReport, user } = this.state;
    let newRate = bugReport.rating;

    switch (agreeValue) {
      case agreeEnum.AGREE:
        newRate += roadStateConstant;
        break;
      case agreeEnum.DISAGREE:
        newRate -= roadStateConstant;
        break;
      default:
        alert('Invalid agree type');
        break;
    }
    this.setState({
      bugReport: { ...bugReport, rating: newRate }
    });
    const newUserPollResult = {
      id,
      agreeValue
    };
    this.setState({
      user: {
        ...user,
        pollList: [...user.pollList, newUserPollResult]
      }
    });
    debugger;
  };

  handleCommentChange = event => {
    const { comment } = this.state;
    const text = event.currentTarget.value;
    this.setState({
      comment: {
        ...comment,
        text: text
      }
    });
  };

  handleCommentFormSubmit = event => {
    event.preventDefault();
    const { bugReport, comment } = this.state;
    const newId = Math.max(...bugReport.comments.map(x => x.id)) + 1;
    this.setState({
      comment: {
        ...comment,
        id: newId
      }
    });
    this.setState({
      bugReport: {
        ...bugReport,
        comments: [...bugReport.comments, { ...comment }]
      }
    });
  };

  handleShow = () => this.setState({ ...this.state, isModalOpened: true });
  handleClose = () => this.setState({ ...this.state, isModalOpened: false });

  render() {
    const { bugReport, isModalOpened, user } = this.state;

    return (
      <Container>
        <ModalCaller id={bugReport.id} handleShow={this.handleShow} />
        <Modal show={isModalOpened} onHide={this.handleClose}>
          <Modal.Dialog scrollable={true}>
            <Modal.Header>
              {!bugReport.photos || bugReport.photos.length === 0 ? (
                <NoPhotosAvailable />
              ) : (
                <Photos photos={bugReport.photos} />
              )}
            </Modal.Header>
            <Modal.Body>
              <Poll
                handleAgreeButton={this.handleAgreeButton}
                id={bugReport.id}
                user={user}
              />
              <br />
              <BodyContainer
                description={bugReport.description}
                state={bugReport.state}
                rating={bugReport.rating}
                commentsCount={
                  !bugReport.comments ? 0 : bugReport.comments.length
                }
              />
              <br />
              {!bugReport.comments || bugReport.comments.length === 0 ? (
                <NoComments />
              ) : (
                <Comments
                  comments={bugReport.comments}
                  handleLikeButton={this.handleLikeButton}
                  user={user}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <CommentForm
                handleChange={this.handleCommentChange}
                handleSubmit={this.handleCommentFormSubmit}
              />
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </Container>
    );
  }
}

const didUserPolled = (user, pollId) => {
  const idList = user.pollList.map(x => x.id);
  return idList.indexOf(pollId) !== -1;
};

const didUserLiked = (user, likeId, likeValue) => {
  const idList = user.likeList.map(x => x.id);
  return (
    idList.indexOf(likeId) !== -1 &&
    user.likeList.find(likeId).likeValue === likeValue
  );
};

const rollbackLike = (comment, likeValue) => {
  switch (likeValue) {
    case likeEnum.LIKE:
      return { ...comment, likes: comment.likes - 1 };
    case likeEnum.DISLIKE:
      return { ...comment, dislikes: comment.dislikes - 1 };
    default:
      return comment;
  }
};

const mapStateToProps = state => ({
  bugReport: state.bugReport,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  bugReportActions: bindActionCreators(bugReportActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BugReport);

export const NoPhotosAvailable = () => (
  <Card key='emptyImage'>
    <Card.Img
      variant='top'
      src='https://scontent.fiev1-1.fna.fbcdn.net/v/t1.0-9/51760210_10155878999561389_7628714773646934016_o.jpg?_nc_cat=104&_nc_oc=AQnjSEe5kf53VvjoC-puvwwP7XsR6mDvPai2W5VoHhtyf12JtMgTaSeqNdEGf7iRXn8&_nc_ht=scontent.fiev1-1.fna&oh=5c3e1a8c2ef5521b95ce4e16e0fd9a79&oe=5DB35696'
      alt='No photos yet!'
    />
  </Card>
);

export const Photo = ({ photo }) => (
  <Card key={photo}>
    <Card.Img variant='top' src={photo} alt='Not downloaded yet:(' />
  </Card>
);

export const Photos = ({ photos }) => (
  <Carousel>
    {photos.map(photo => (
      <CarouselItem>
        <Photo photo={photo} />
      </CarouselItem>
    ))}
  </Carousel>
);

export const Comment = ({
  comment,
  handleLikeButton,
  disabledLikeButton,
  disabledDislikeButton
}) => (
  <Card key={comment.id}>
    <Card.Header as='h5'>{comment.userName}</Card.Header>
    <Card.Body>
      <Card.Text>{comment.text}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Row>
        <Col>
          <Button
            key={comment.id}
            variant='outline-success'
            onClick={handleLikeButton}
            value={likeEnum.LIKE}
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
            variant='outline-danger'
            onClick={handleLikeButton}
            value={likeEnum.DISLIKE}
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

export const Comments = ({ comments, handleLikeButton, user }) => (
  <Container>
    {comments.map(comment => (
      <Comment
        comment={comment}
        handleLikeButton={handleLikeButton}
        disabledLikeButton={didUserLiked(user, comment.id, likeEnum.LIKE)}
        disabledDislikeButton={didUserLiked(user, comment.id, likeEnum.DISLIKE)}
      />
    ))}
  </Container>
);

export const NoComments = () => (
  <Card>
    <Card.Body>
      <Card.Title>No comments yet!</Card.Title>
    </Card.Body>
  </Card>
);

export const ModalCaller = ({ id, handleShow }) => (
  <Button variant='light' onClick={handleShow}>
    Info about bug report # {id}
  </Button>
);

export const Poll = ({ id, handleAgreeButton, user }) => (
  <Card>
    <Card.Header as={'h6'}>Poll</Card.Header>
    {didUserPolled(user, id) ? (
      <Card.Body>
        <Card.Text>You've already polled!</Card.Text>
      </Card.Body>
    ) : (
      <div>
        <Card.Body>
          <Card.Text>Is this problem true?</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Container>
            <Row>
              <Col>
                <Button
                  variant='success'
                  onClick={handleAgreeButton}
                  value={agreeEnum.AGREE}
                  id={id}
                >
                  Yes
                </Button>
              </Col>
              <Col>
                <Button
                  variant='danger'
                  onClick={handleAgreeButton}
                  value={agreeEnum.DISAGREE}
                  id={id}
                >
                  No
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </div>
    )}
  </Card>
);

export const Description = ({ description }) => (
  <Card>
    <Card.Header as='h6'>Description</Card.Header>
    <Card.Body>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

export const Information = ({ state, rating, commentsCount }) => (
  <Card>
    <Card.Header as='h6'>Information</Card.Header>
    <Card.Body>
      <Row>
        <Col md={1}>
          <FaCheck />
        </Col>
        <Col>Status: {state}</Col>
      </Row>
      <Row>
        <Col md={1}>
          <FaStar />
        </Col>
        <Col>Rating: {+rating.toFixed(2)}</Col>
      </Row>
      <Row>
        <Col md={1}>
          <FaComment />
        </Col>
        <Col>Comments: {commentsCount}</Col>
      </Row>
    </Card.Body>
  </Card>
);

export const BodyContainer = ({
  description,
  state,
  rating,
  commentsCount
}) => (
  <Container>
    <Row>
      <Col md={{ offset: 0, span: 5 }}>
        <Description description={description} />
      </Col>
      <Col md={{ offset: -1, span: 6 }}>
        <Information
          state={state}
          rating={rating}
          commentsCount={commentsCount}
        />
      </Col>
    </Row>
  </Container>
);

export const CommentForm = ({ handleSubmit, handleChange }) => (
  <Card className='w-100'>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='commentInput'>
          <Form.Control
            as='textarea'
            rows={5}
            placeholder='Enter your comment'
            onChange={handleChange}
          />
        </Form.Group>
        <Button className='btn-primary' type='submit'>
          Add comment
        </Button>
      </Form>
    </Card.Body>
  </Card>
);

BugReport.propTypes = {
  bugReport: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
