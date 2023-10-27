import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onOpen }) => {
  const galleryList = images.map(image => (
    <ImageGalleryItem
      key={image.id}
      smallImg={image.webformatURL}
      largeImg={image.largeImageURL}
      tags={image.tags}
      onOpen={onOpen}
    />
  ));

  return <Gallery>{galleryList}</Gallery>;
};
