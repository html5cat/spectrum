// @flow
import React from 'react';
// $FlowFixMe
import compose from 'recompose/compose';
//$FlowFixMe
import lifecycle from 'recompose/lifecycle';
import { sortAndGroupMessages } from '../../../helpers/messages';
import ChatMessages from '../../../components/chatMessages';
import { displayLoadingState } from '../../../components/loading';
import Icon from '../../../components/icons';
import { HorizontalRule } from '../../../components/globals';
import { getDirectMessageGroupMessages } from '../queries';
import { toggleReactionMutation } from '../mutations';

const lifecycles = lifecycle({
  state: {
    subscribed: false,
  },
  componentDidUpdate() {
    if (!this.props.loading && !this.state.subscribed) {
      this.setState({
        subscribed: true,
      });
      this.props.subscribeToNewMessages();
    }
  },
});

const MessagesWithData = ({
  data: { error, loading, messages },
  toggleReaction,
  forceScrollToBottom,
}) => {
  if (error) {
    return <div>Error!</div>;
  }

  if (!messages) {
    return <div>No messages yet!</div>;
  }

  const sortedMessages = sortAndGroupMessages(messages);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '24px 0', background: '#fff' }}>
        <HorizontalRule>
          <hr />
          <Icon glyph="messages" />
          <hr />
        </HorizontalRule>
      </div>
      <ChatMessages
        toggleReaction={toggleReaction}
        messages={sortedMessages}
        forceScrollToBottom={forceScrollToBottom}
      />
    </div>
  );
};

const Messages = compose(
  toggleReactionMutation,
  getDirectMessageGroupMessages,
  lifecycles,
  displayLoadingState
)(MessagesWithData);

export default Messages;