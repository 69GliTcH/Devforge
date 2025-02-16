"use client";

import { useState } from "react";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const ITEMS_PER_PAGE = 6;

export default function StartupList({ posts, query }: { posts: StartupCardType[]; query: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const paginatedPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const generatePageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 3) {
            return [1, 2, 3, "...", totalPages];
        } else if (currentPage >= totalPages - 2) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [1, "...", currentPage, "...", totalPages];
        }
    };

    return (
        <section className="section_container">
            <p className="text-30-semibold">
                {query ? `Search results for "${query}"` : "All Projects"}
            </p>

            <ul className="mt-7 card_grid">
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post: StartupCardType) => (
                        <StartupCard key={post?._id} post={post} />
                    ))
                ) : (
                    <div className="no-results">No Startups Found</div>
                )}
            </ul>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls flex justify-center gap-3 mt-8">
                    {/* Previous Button */}
                    <button
                        className={`pagination-button ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ⬅ Prev
                    </button>

                    {/* Page Numbers with Ellipsis */}
                    {generatePageNumbers().map((page, index) => (
                        <button
                            key={index}
                            className={`pagination-number ${page === currentPage ? "underline text-black font-bold scale-110" : "bg-gray-200 text-gray-700"
                                } rounded-lg px-4 py-2 text-lg transition-all`}
                            onClick={() => typeof page === "number" && handlePageChange(page)}
                            disabled={typeof page !== "number"}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        className={`pagination-button ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next ➡
                    </button>
                </div>
            )}
        </section>
    );
}
