import React, {FC, useEffect} from 'react';
import EmptyDataSearch from './EmptyDataSearch';
import EmptyTextSearch from './EmptyTextSearch';
import SearchList from 'components/common/SearchList';
import useSearchUserStore from 'src/stores/SearchUserStore';
import {SearchLoading} from 'components/common/loadings';
import useDebounce from 'src/hooks/useDebounce';
import SearchError from './SearchError';

interface SearchResultProps {
  searchText: string;
}

const SearchResult: FC<SearchResultProps> = ({searchText}) => {
  const getUsers = useSearchUserStore(state => state.getUsers);
  const clearAll = useSearchUserStore(state => state.clearAll);
  const loading = useSearchUserStore(state => state.loading);
  const error = useSearchUserStore(state => state.error);
  const users = useSearchUserStore(state => state.users);

  const searchTextDebounced = useDebounce(searchText, 300);

  useEffect(() => {
    (async () => {
      if (searchTextDebounced === '') {
        clearAll();
        return;
      }
      await getUsers(searchTextDebounced);
    })();
  }, [searchTextDebounced, clearAll]);

  if (loading) return <SearchLoading />;
  if (error) return <SearchError text={error} />;

  return (
    <>
      {searchText === '' ? (
        <EmptyTextSearch />
      ) : users.length === 0 ? (
        <EmptyDataSearch />
      ) : (
        <SearchList data={users} />
      )}
    </>
  );
};

export default SearchResult;
