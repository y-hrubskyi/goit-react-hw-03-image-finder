import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Placeholder } from 'components/Placeholder/Placeholder';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';

import * as API from 'services/api';

import { GlobalStyle } from './GlobalStyle';
import { Layout } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: null,
    loadMore: false,

    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;

    if (prevQuery === query && prevPage === page) {
      return;
    }

    try {
      this.setState({ isLoading: true, error: null });

      const searchQuery = query.slice(query.indexOf('/') + 1);
      const data = await API.fetchImages(searchQuery, page);
      const loadMore = page * API.per_page < data.totalHits;

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        loadMore,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  searchFormSubmit = query => {
    this.setState({ query: `${Date.now()}/${query}`, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { query, images, isLoading, error, loadMore } = this.state;
    const searchQuery = query.slice(query.indexOf('/') + 1);
    const isEmptyResults = query && !error && !isLoading && !images.length;
    const isNeedLoadMore = !isLoading && loadMore;

    return (
      <Layout>
        <GlobalStyle />
        <Toaster toastOptions={{ duration: 1500 }} />

        <SearchBar onSubmit={this.searchFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {isEmptyResults && (
          <Placeholder>
            No any results by <b>"{searchQuery}"</b> request
          </Placeholder>
        )}
        {error && <Placeholder>Whooops.. {error.message}</Placeholder>}
        {isNeedLoadMore && <LoadMoreBtn onLoadMore={this.handleLoadMore} />}
      </Layout>
    );
  }
}
