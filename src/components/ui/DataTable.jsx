import React, { useEffect, useRef } from 'react';
import { IoChevronBack, IoChevronForward, IoSearchOutline } from 'react-icons/io5';
import gsap from 'gsap';

// Pagination Controls
function PaginationControls({
    currentPage,
    pageSize,
    totalItems,
    onPageChange,
    onSizeChange,
    pageSizes = [10, 25, 50, 100],
}) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border bg-muted/20">
            {/* Left - Items info */}
            <div className="text-sm text-muted-foreground">
                {totalItems === 0 ? (
                    'No items to display'
                ) : (
                    <span>
                        Showing <span className="font-medium text-foreground">{startItem}</span> to{' '}
                        <span className="font-medium text-foreground">{endItem}</span> of{' '}
                        <span className="font-medium text-foreground">{totalItems}</span> results
                    </span>
                )}
            </div>

            {/* Right - Controls */}
            <div className="flex items-center gap-6">
                {/* Rows per page */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground whitespace-nowrap">
                        Rows per page:
                    </label>
                    <select
                        value={pageSize}
                        onChange={(e) => onSizeChange(Number(e.target.value))}
                        className="h-9 rounded-lg border border-border/40 bg-background/50 backdrop-blur-sm px-3 text-sm font-medium focus:outline-none focus:border-primary/60 focus:bg-background transition-all duration-200"
                    >
                        {pageSizes.map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Page navigation */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                        Page {currentPage} of {totalPages}
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            aria-label="Previous page"
                        >
                            <IoChevronBack size={18} />
                        </button>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            aria-label="Next page"
                        >
                            <IoChevronForward size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main DataTable
export default function DataTable({
    headers = [],
    rows = [],
    currentPage = 1,
    pageSize = 10,
    totalItems = 0,
    onPageChange = () => { },
    onSizeChange = () => { },
    loading = false,
    emptyMessage = 'No data found',
    searchable = false,
    onSearch = () => { },
    className = '',
}) {
    const tableRef = useRef(null);
    const searchRef = useRef(null);
    const prevPageRef = useRef(currentPage);
    const prevPageSizeRef = useRef(pageSize);
    const hasAnimatedRef = useRef(false);

    // Subtle row animation - only on page/size change or initial load
    useEffect(() => {
        if (!tableRef.current || rows.length === 0 || loading) return;

        // Only animate if:
        // 1. Page changed
        // 2. Page size changed
        // 3. First time loading (hasn't animated yet)
        const pageChanged = prevPageRef.current !== currentPage;
        const pageSizeChanged = prevPageSizeRef.current !== pageSize;
        const shouldAnimate = pageChanged || pageSizeChanged || !hasAnimatedRef.current;

        if (shouldAnimate) {
            const rowElements = tableRef.current.querySelectorAll('tbody tr');

            gsap.fromTo(
                rowElements,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: 'power2.out',
                }
            );

            hasAnimatedRef.current = true;
        }

        // Update previous values
        prevPageRef.current = currentPage;
        prevPageSizeRef.current = pageSize;
    }, [rows, currentPage, pageSize, loading]);

    // Reset animation flag when loading starts
    useEffect(() => {
        if (loading) {
            hasAnimatedRef.current = false;
        }
    }, [loading]);

    return (
        <div className={`flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden ${className}`}>
            {/* Search bar (optional) */}
            {searchable && (
                <div className="px-6 py-4 border-b border-border bg-muted/20">
                    <div className="relative max-w-sm">
                        <IoSearchOutline
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            size={18}
                        />
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar">
                <table
                    ref={tableRef}
                    className="min-w-full divide-y divide-border"
                >
                    <thead className="bg-muted/30">
                        <tr>
                            {headers.map((header, i) => (
                                <th
                                    key={i}
                                    scope="col"
                                    className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border bg-background">
                        {loading ? (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
                                        <p className="text-sm text-muted-foreground">Loading data...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                                            <IoSearchOutline size={24} className="text-muted-foreground" />
                                        </div>
                                        <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
                                        <p className="text-xs text-muted-foreground">Try adjusting your filters or search</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="transition-colors hover:bg-muted/40 group"
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="px-6 py-4 text-sm text-foreground whitespace-nowrap"
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {(totalItems > 0 || loading) && (
                <PaginationControls
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={onPageChange}
                    onSizeChange={onSizeChange}
                />
            )}
        </div>
    );
}