import React, {FC, useEffect, useRef} from 'react';
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
  const searchTextDebounced = useDebounce(searchText, 150);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const ab = new AbortController();
    abortControllerRef.current = ab;
    const fetching = async () => {
      if (searchTextDebounced === '') {
        clearAll();
        return;
      }
      await getUsers(searchTextDebounced, ab.signal);
    };
    fetching();
    return () => ab.abort();
  }, [searchTextDebounced, clearAll, getUsers]);

  if (loading) return <SearchLoading />;
  if (error) return <SearchError text={error} />;

  return (
    <>
      {searchTextDebounced === '' ? (
        <EmptyTextSearch />
      ) : users && users.length === 0 ? (
        <EmptyDataSearch />
      ) : (
        <SearchList data={users || []} />
      )}
    </>
  );
};

export default SearchResult;
