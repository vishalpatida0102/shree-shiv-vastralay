import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Loader2 } from 'lucide-react';
import SEO from '../components/ui/SEO';
import PageTransition from '../components/animations/PageTransition';
import SareeCard from '../components/catalog/SareeCard';
import StaggerChildren from '../components/animations/StaggerChildren';
import { SareeCardSkeleton } from '../components/ui/Skeleton';
import { productsApi, categoriesApi } from '../services/api';
import { toSaree, toCategory } from '../services/helpers';
import type { Saree, Category } from '../types';

const ITEMS_PER_PAGE = 12;

const sortOptions = [
  { value: 'newest', label: 'नई साड़ियाँ' },
  { value: 'price-low', label: 'कम कीमत' },
  { value: 'price-high', label: 'ज़्यादा कीमत' },
];

const fabricOptions = ['शुद्ध सिल्क', 'कॉटन', 'ऑर्गेंज़ा', 'जॉर्जेट', 'लिनन कॉटन'];
const colorOptions = ['लाल', 'सुनहरा', 'नीला', 'बैंगनी', 'काला', 'गुलाबी', 'हरा', 'बेज', 'पीला', 'मेरून'];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('newest');
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const [activeFabric, setActiveFabric] = useState('');
  const [activeColor, setActiveColor] = useState('');

  // Fetch categories once
  useEffect(() => {
    categoriesApi.getAll().then((cats) => setCategories(cats.map(toCategory))).catch(() => {});
  }, []);

  // Fetch products (paginated) — reset on filter/sort change
  const fetchProducts = useCallback(async (pageNum: number, append: boolean) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const params: { page: number; limit: number; category?: string } = {
        page: pageNum,
        limit: ITEMS_PER_PAGE,
      };
      if (activeCategory) params.category = activeCategory;

      const data = await productsApi.getPaginated(params);
      const converted = data.products.map(toSaree);
      setSarees((prev) => append ? [...prev, ...converted] : converted);
      setTotal(data.total);
      setPage(pageNum);
    } catch {
      // silent
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  // Client-side filtering for fabric/color + sorting
  const filtered = useMemo(() => {
    let result = [...sarees];

    if (activeFabric) {
      result = result.filter((s) => s.fabric === activeFabric);
    }
    if (activeColor) {
      result = result.filter((s) => s.color === activeColor);
    }

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [sarees, activeFabric, activeColor, sort]);

  const clearFilters = () => {
    setSearchParams({});
    setActiveFabric('');
    setActiveColor('');
  };

  const hasActiveFilters = activeCategory || activeFabric || activeColor;
  const hasMore = sarees.length < total;

  const handleLoadMore = () => {
    fetchProducts(page + 1, true);
  };

  return (
    <PageTransition>
      <SEO title="साड़ियाँ" description="सिल्क, बनारसी, पैठणी, कॉटन और डिज़ाइनर साड़ियों का पूरा संग्रह। नागपुर वाला पर खरीदें।" />
      <div style={{ paddingTop: '80px', paddingBottom: '100px' }} className="md:pt-24 md:pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto" style={{ padding: '0 16px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span
              className="font-heading"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                color: '#1a1a1a',
                fontSize: '14px',
                fontWeight: '700',
                padding: '8px 22px',
                borderRadius: '50px',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(184,150,12,0.25)',
              }}
            >
              साड़ियाँ
            </span>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              हमारा पूरा संग्रह देखें ({total} साड़ियाँ)
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: '12px', paddingTop: '20px' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <SareeCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Sort & Filter Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '10px', overflow: 'hidden' }}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', border: '1px solid #f0ebe0', padding: '9px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', flexShrink: 0 }}
                >
                  <SlidersHorizontal size={14} />
                  फ़िल्टर
                  {hasActiveFilters && (
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#B8960C', borderRadius: '50%', display: 'inline-block' }} />
                  )}
                </button>

                <div style={{ position: 'relative', minWidth: '0' }}>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    style={{ appearance: 'none', backgroundColor: '#fff', border: '1px solid #f0ebe0', padding: '9px 28px 9px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', outline: 'none', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#4a4a4a' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '32px' }}>
                {/* Desktop Sidebar Filters */}
                <div className="hidden md:block" style={{ width: '220px', flexShrink: '0' }}>
                  <FilterPanel
                    categories={categories}
                    activeCategory={activeCategory}
                    activeFabric={activeFabric}
                    activeColor={activeColor}
                    onCategoryChange={(c) => setSearchParams(c ? { category: c } : {})}
                    onFabricChange={setActiveFabric}
                    onColorChange={setActiveColor}
                    onClear={clearFilters}
                    hasActiveFilters={!!hasActiveFilters}
                  />
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                  {showFilters && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden"
                        style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50 }}
                        onClick={() => setShowFilters(false)}
                      />
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                        className="md:hidden"
                        style={{ position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#fff', borderRadius: '20px 20px 0 0', zIndex: 50, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
                          <div style={{ width: '36px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px' }}>
                          <div>
                            <h3 className="font-heading" style={{ fontSize: '18px', fontWeight: '700', color: '#2D2D2D', margin: '0' }}>फ़िल्टर</h3>
                            {hasActiveFilters && (<p style={{ fontSize: '12px', color: '#B8960C', marginTop: '2px' }}>फ़िल्टर लागू हैं</p>)}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {hasActiveFilters && (
                              <button onClick={clearFilters} style={{ fontSize: '12px', color: '#B8960C', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>सब हटाएँ</button>
                            )}
                            <button onClick={() => setShowFilters(false)} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                              <X size={16} style={{ color: '#666' }} />
                            </button>
                          </div>
                        </div>
                        <div style={{ height: '1px', backgroundColor: '#f0f0f0' }} />
                        <div style={{ overflowY: 'auto', padding: '20px', flex: '1' }}>
                          <FilterPanel
                            categories={categories}
                            activeCategory={activeCategory}
                            activeFabric={activeFabric}
                            activeColor={activeColor}
                            onCategoryChange={(c) => setSearchParams(c ? { category: c } : {})}
                            onFabricChange={setActiveFabric}
                            onColorChange={setActiveColor}
                            onClear={clearFilters}
                            hasActiveFilters={!!hasActiveFilters}
                          />
                        </div>
                        <div style={{ padding: '16px 20px', paddingBottom: '28px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
                          <button onClick={() => setShowFilters(false)} style={{ width: '100%', backgroundColor: '#B8960C', color: '#fff', fontWeight: '600', padding: '14px', borderRadius: '12px', fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                            {filtered.length} साड़ियाँ देखें
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Saree Grid */}
                <div style={{ flex: '1', minWidth: '0' }}>
                  {filtered.length > 0 ? (
                    <>
                      <StaggerChildren className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: '12px' }}>
                        {filtered.map((saree) => (
                          <SareeCard key={saree.id} saree={saree} />
                        ))}
                      </StaggerChildren>

                      {/* Load More Button */}
                      {hasMore && !activeFabric && !activeColor && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                          <button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              backgroundColor: '#fff',
                              color: '#B8960C',
                              border: '1.5px solid #B8960C',
                              padding: '12px 32px',
                              borderRadius: '12px',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: loadingMore ? 'not-allowed' : 'pointer',
                              opacity: loadingMore ? 0.7 : 1,
                              transition: 'all 0.2s',
                            }}
                          >
                            {loadingMore ? (
                              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                            ) : null}
                            {loadingMore ? 'लोड हो रहा है...' : `और साड़ियाँ देखें (${total - sarees.length} और)`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-charcoal-light text-lg">कोई साड़ी नहीं मिली</p>
                      <button onClick={clearFilters} className="mt-4 text-maroon font-semibold underline">सभी फ़िल्टर हटाएँ</button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

interface FilterPanelProps {
  categories: Category[];
  activeCategory: string;
  activeFabric: string;
  activeColor: string;
  onCategoryChange: (c: string) => void;
  onFabricChange: (f: string) => void;
  onColorChange: (c: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

function FilterPanel({
  categories,
  activeCategory,
  activeFabric,
  activeColor,
  onCategoryChange,
  onFabricChange,
  onColorChange,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) {

  const chipStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: isActive ? '600' : '400',
    border: isActive ? '1.5px solid #B8960C' : '1.5px solid #e8e8e8',
    backgroundColor: isActive ? '#B8960C' : '#fff',
    color: isActive ? '#fff' : '#2D2D2D',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap' as const,
  });

  const sectionTitle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {hasActiveFilters && (
        <button onClick={onClear} style={{ fontSize: '12px', color: '#B8960C', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textAlign: 'left', padding: '0' }}>
          सभी फ़िल्टर हटाएँ
        </button>
      )}
      <div>
        <h4 style={sectionTitle}>श्रेणी</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => onCategoryChange(activeCategory === cat.id ? '' : cat.id)} style={chipStyle(activeCategory === cat.id)}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 style={sectionTitle}>कपड़ा</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {fabricOptions.map((f) => (
            <button key={f} onClick={() => onFabricChange(activeFabric === f ? '' : f)} style={chipStyle(activeFabric === f)}>{f}</button>
          ))}
        </div>
      </div>
      <div>
        <h4 style={sectionTitle}>रंग</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {colorOptions.map((c) => (
            <button key={c} onClick={() => onColorChange(activeColor === c ? '' : c)} style={chipStyle(activeColor === c)}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
