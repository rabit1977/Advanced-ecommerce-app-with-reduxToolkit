'use client';

import { useRef } from 'react';

import { usePathnameClearEffect } from '@/lib/hooks/usePathnameClearEffect';
import { useSearchAPI } from '@/lib/hooks/useSearchAPI';
import { useSearchKeyboard } from '@/lib/hooks/useSearchKeyboard';
import { useSearchNavigation } from '@/lib/hooks/useSearchNavigation';
import { useSearchState } from '@/lib/hooks/useSearchState';
import { SearchDropdown } from './SearchDropdown';
import { SearchInput } from './SearchInput';

export const SearchBar = () => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    inputValue,
    setInputValue,
    isSearchFocused,
    setIsSearchFocused,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
    clearSearch,
    resetSearch,
  } = useSearchState();

  useSearchAPI({
    query: inputValue,
    setResults: setSearchResults,
    setIsLoading,
  });

  const { navigateToSearchResults, isPending } = useSearchNavigation({
    inputValue,
    setIsSearchFocused,
    inputRef,
  });

  const { handleSearchKeyDown, handleResultKeyDown } = useSearchKeyboard({
    navigateToSearchResults,
    setIsSearchFocused,
    inputRef,
    containerRef: searchContainerRef,
  });

  usePathnameClearEffect(resetSearch);

  const handleProductSelection = () => {
    setIsSearchFocused(false);
    clearSearch();
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const showResults = isSearchFocused && inputValue.length > 1;

  return (
    <div
      ref={searchContainerRef}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        if (!searchContainerRef.current?.contains(e.relatedTarget as Node)) {
          setIsSearchFocused(false);
        }
      }}
      className='relative w-full'
    >
      <SearchInput
        ref={inputRef}
        value={inputValue}
        onChange={setInputValue}
        onFocus={() => setIsSearchFocused(true)}
        onKeyDown={handleSearchKeyDown}
        onClear={handleClearSearch}
        isPending={isPending}
        showResults={showResults}
      />

      {showResults && (
        <SearchDropdown
          isLoading={isLoading}
          results={searchResults}
          inputValue={inputValue}
          onProductSelect={handleProductSelection}
          onViewAll={navigateToSearchResults}
          onResultKeyDown={handleResultKeyDown}
          isPending={isPending}
        />
      )}
    </div>
  );
};
