"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { ButtonProps, buttonStyles } from "./button";

type PaginationProps = {
    totalPages: number;
    initialPage?: number;
    onChange?: (page: number) => void;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    onePage?: boolean;
    lastPage?: boolean;
    nextText?: string;
    previousText?: string;
};

const Paginations: React.FC<PaginationProps> = ({
    totalPages,
    initialPage = 1,
    onChange,
    size = "md",
    onePage = false,
    lastPage = false,
    nextText = "Next",
    previousText = "Previous",
    children,
    ...props
}) => {
    const [currentPage, setCurrentPage] = React.useState(initialPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            if (onChange) {
                onChange(page);
            }
        }
    };

    const renderChildren = () => {
        if (React.Children.count(children) > 0) {
            return React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === PaginationLink) {
                    return React.cloneElement(child, {
                        onClick: () => handlePageChange(Number(child.props.children)),
                    } as React.Attributes & { onClick: () => void });
                }
                return child;
            });
        }

        return null;
    };

    return (
        <Pagination {...props}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        previousText={previousText}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>

                {currentPage === 1 && totalPages > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink isActive size={size}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {totalPages >= 2 && (
                            <PaginationItem>
                                <PaginationLink size={size} onClick={() => handlePageChange(2)}>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {totalPages >= 3 && (
                            <PaginationItem>
                                <PaginationLink size={size} onClick={() => handlePageChange(3)}>
                                    3
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </>
                )}

                {currentPage === totalPages && totalPages > 1 && (
                    <>
                        {totalPages - 2 > 0 && (
                            <PaginationItem>
                                <PaginationLink
                                    size={size}
                                    onClick={() => handlePageChange(totalPages - 2)}
                                >
                                    {totalPages - 2}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        {totalPages - 1 > 0 && (
                            <PaginationItem>
                                <PaginationLink
                                    size={size}
                                    onClick={() => handlePageChange(totalPages - 1)}
                                >
                                    {totalPages - 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink isActive size={size}>
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                {onePage && currentPage > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink size={size} onClick={() => handlePageChange(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 2 && <PaginationEllipsis />}
                    </>
                )}

                {currentPage > 1 && currentPage < totalPages && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                size={size}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                {currentPage - 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive size={size}>
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage + 1 <= totalPages && (
                            <PaginationItem>
                                <PaginationLink
                                    size={size}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </>
                )}

                {currentPage + 1 < totalPages && lastPage && currentPage > 2 && (
                    <>
                        {currentPage > 2 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationLink
                                size={size}
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <PaginationNext
                        nextText={nextText}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages} // Disable if on the last page
                    />
                </PaginationItem>

                {/* Render children directly here */}
                {renderChildren()}
            </PaginationContent>
        </Pagination>
    );
};

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<"a">;

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonStyles({
                variant: isActive ? "outline" : "quiet",
                size,
            }),
            className,
        )}
        {...props}
    />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className,
    disabled,
    previousText = "Previous",
    ...props
}: React.ComponentProps<typeof PaginationLink> & {
    disabled?: boolean;
    previousText?: string;
}) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="md"
        className={cn(
            "gap-1 pl-2.5",
            className,
            disabled && "cursor-not-allowed opacity-50",
        )}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>{previousText}</span>
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
    className,
    disabled,
    nextText = "Next",
    ...props
}: React.ComponentProps<typeof PaginationLink> & {
    disabled?: boolean;
    nextText?: string;
}) => (
    <PaginationLink
        aria-label="Go to next page"
        size="md"
        className={cn(
            "gap-1 pr-2.5",
            className,
            disabled && "cursor-not-allowed opacity-50",
        )}
        {...props}
    >
        <span>{nextText}</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
    Paginations,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
};
