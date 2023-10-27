import { Component } from 'react';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Modal } from './Modal/Modal';

import { fetchImages, per_page } from 'services/api';

import { AppWrapper } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: null,
    total: null,

    isLoading: false,
    error: null,

    isOpenModal: false,
    img: null,
    tags: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const currentQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevQuery === currentQuery && prevPage === currentPage) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const data = await fetchImages(currentQuery, currentPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  searchFormSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = (img, tags) => {
    this.setState({ isOpenModal: true, img, tags });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { images, isLoading, page, total, isOpenModal, img, tags } =
      this.state;
    const isNeedLoadMore =
      images.length > 0 && !isLoading && page * per_page < total;

    return (
      <AppWrapper>
        <GlobalStyle />

        <SearchBar onSubmit={this.searchFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onOpen={this.openModal} />
        )}
        {isLoading && <Loader />}
        {isNeedLoadMore && <LoadMoreBtn onClick={this.incrementPage} />}
        {isOpenModal && (
          <Modal img={img} tags={tags} onClose={this.closeModal} />
        )}
      </AppWrapper>
    );
  }
}
