import React from 'react';

class HomePage extends React.Component {
  state = {
    bugReport: {
      id: 1,
      comments: [
        {
          id: 1,
          likes: 0,
        },
        {
          id: 2,
          likes: 0,
        },
      ],
    },
  };

  handleClick = (event) => {
    const { bugReport } = this.state;
    const id = +event.currentTarget.id;
    const cloneComments = bugReport.comments.map(x => (x.id === id ? { ...x, likes: x.likes + 1 } : x));
    this.setState(
      {
        bugReport: {
          ...bugReport,
          comments: [...[], ...cloneComments],
        },
      },
      () => console.log('success'),
    );
  };

  render() {
    const { bugReport } = this.state;
    return (
      <div>
        {bugReport.comments.map(comment => (
          <dl>
            <button onClick={this.handleClick} id={comment.id}>
              Like comment
              {' '}
              {comment.id}
            </button>
            <dt>{comment.id}</dt>
            <dd>{comment.likes}</dd>
          </dl>
        ))}
      </div>
    );
  }
}

export default HomePage;
