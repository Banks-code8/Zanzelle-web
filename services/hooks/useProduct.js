'use client';

import { useEffect, useState } from 'react';
import { getProductBySlug, getProducts } from '@/services/productService';

// Single Product
export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await getProductBySlug(slug);

        if (res.success) {
          setProduct(res.data?.data || null);
        }
      } catch (error) {
        console.error('Fetch product error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return {
    product,
    loading,
  };
};

// Product Catalog
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts(filters);

        if (res.success) {
          setProducts(res.data?.products || []);

          setPagination({
            page: res.data?.page || 1,
            pages: res.data?.pages || 1,
            total: res.data?.total || 0,
          });
        }
      } catch (error) {
        console.error('Fetch products error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    pagination,
  };
};
