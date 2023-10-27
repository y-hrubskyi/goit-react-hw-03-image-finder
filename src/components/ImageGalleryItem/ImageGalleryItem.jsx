import { Component } from 'react';

import { Modal } from 'components/Modal/Modal';
import { Image, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = { isOpenModal: false };

  openModal = () => {
    this.setState({ isOpenModal: true });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { isOpenModal } = this.state;
    const { smallImg, tags, largeImg } = this.props;

    return (
      <Item onClick={this.openModal}>
        <Image src={smallImg} alt={tags} />
        {isOpenModal && (
          <Modal img={largeImg} tags={tags} onClose={this.closeModal} />
        )}
      </Item>
    );
  }
}
