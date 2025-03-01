import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Calculate the range of page numbers to display
  const range = 2; // Show 2 pages before and after the current page
  let startPage = Math.max(1, currentPage - range);
  let endPage = Math.min(totalPages, currentPage + range);

  // Ensure we always show at least 5 pages if available
  if (endPage - startPage + 1 < 5) {
    if (startPage === 1) {
      endPage = Math.min(5, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - 4);
    }
  }

  // Generate the array of page numbers
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav className="flex justify-center my-8" aria-label="Pagination">
      <ul className="flex space-x-1">
        {/* Previous page button */}
        {currentPage > 1 && (
          <li>
            <Link
              href={`${basePath}${currentPage === 2 ? '' : `/pagina/${currentPage - 1}`}`}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              aria-label="Ga naar vorige pagina"
            >
              &laquo;
            </Link>
          </li>
        )}

        {/* First page and ellipsis if needed */}
        {startPage > 1 && (
          <>
            <li>
              <Link
                href={basePath}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                1
              </Link>
            </li>
            {startPage > 2 && (
              <li>
                <span className="px-4 py-2 text-gray-500">...</span>
              </li>
            )}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={`${basePath}${page === 1 ? '' : `/pagina/${page}`}`}
              className={`px-4 py-2 border rounded-md ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Link>
          </li>
        ))}

        {/* Last page and ellipsis if needed */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li>
                <span className="px-4 py-2 text-gray-500">...</span>
              </li>
            )}
            <li>
              <Link
                href={`${basePath}/pagina/${totalPages}`}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}

        {/* Next page button */}
        {currentPage < totalPages && (
          <li>
            <Link
              href={`${basePath}/pagina/${currentPage + 1}`}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
              aria-label="Ga naar volgende pagina"
            >
              &raquo;
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;