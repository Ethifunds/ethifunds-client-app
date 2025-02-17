import { PaginatedResponse } from "@/types/global.types";
import * as React from "react";
import { useInfiniteQuery } from "react-query";
import Spinner from "../spinner";
import ErrorBox from "../error-box";

type InfiniteScrollProps<T> = {
  queryKey: string[];
  fetchData: (page: number) => Promise<PaginatedResponse<T>>;
  renderItem: (item: T) => React.ReactNode;
};

export default React.memo(function InfiniteScroll<T>({
  queryKey,
  fetchData,
  renderItem,
}: InfiniteScrollProps<T>) {
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery<PaginatedResponse<T>>(
    queryKey,
    async ({ pageParam = 1 }) => {
      const response = await fetchData(pageParam);
      return response;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    const current = loaderRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [handleObserver]);

  const items = data?.pages.flatMap((page) => page.docs) || [];

  return (
    <React.Fragment>
      {items.map((item) => renderItem(item))}
      
      {(isFetching || isFetchingNextPage) && (
        <div className="col-span-full flex w-full justify-center py-2">
          <Spinner size="sm" />
        </div>
      )}
      {!hasNextPage && !isFetching && (
        <div className="col-span-full flex justify-center py-2 text-4xl text-neutral-500">
          ...
        </div>
      )}

      {isError && <ErrorBox error={error} />}
      <div ref={loaderRef} style={{ height: "10px" }} />
    </React.Fragment>
  );
}) as <T>(props: InfiniteScrollProps<T>) => React.ReactNode;
