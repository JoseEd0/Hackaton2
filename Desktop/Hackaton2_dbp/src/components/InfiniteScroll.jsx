import React, { useState, useEffect, useCallback } from 'react';

const InfiniteScroll = ({ loadMore, hasMore, loader, children }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
    setIsFetching(true);
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching || !hasMore) return;
    loadMore().then(() => setIsFetching(false));
  }, [isFetching, hasMore, loadMore]);

  return (
    <>
      {children}
      {isFetching && loader}
    </>
  );
};

export default InfiniteScroll;