import { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export const ProductList = () => {
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${10}&skip=${page * 10}`
      );

      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && hasMore) {
        fetchProducts();
      }
    };
    
    const observer = new IntersectionObserver(observerCallback);

    if (observer && loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);

  return (
    <div>
      {products.map((p) => (
        <ProductItem
          key={p.id}
          title={p.title}
          price={p.price}
          thumbnail={p.thumbnail}
        />
      ))}
      {hasMore && (
        <div ref={loadingRef} className="loading-container">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};
