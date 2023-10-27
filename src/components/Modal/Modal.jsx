import { Component } from 'react';

import { Overlay, StyledModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDowm);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDowm);
  }

  handleKeyDowm = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { img, tags } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <StyledModal>
          <img src={img} alt={tags} />
        </StyledModal>
      </Overlay>
    );
  }
}