import { Component } from 'react';

import { ImageModal } from 'components/ImageModal/ImageModal';
import { Image, Item } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { smallImg, largeImg, tags } = this.props;

    return (
      <Item>
        <Image src={smallImg} alt={tags} onClick={this.toggleModal} />
        <ImageModal
          img={largeImg}
          tags={tags}
          onClose={this.toggleModal}
          isOpen={isModalOpen}
        />
      </Item>
    );
  }
}
