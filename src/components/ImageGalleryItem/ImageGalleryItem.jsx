import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImg, tags, largeImg, onOpen }) => {
  return (
    <Item onClick={() => onOpen(largeImg, tags)}>
      <Image src={smallImg} alt={tags} />
    </Item>
  );
};
