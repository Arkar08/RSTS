import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationProps } from "@/utils/Constant";

const PagePagination = ({currentPage,handleNextPageClick,handlePrevPageClick}:PaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handlePrevPageClick} className="cursor-pointer">
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={handleNextPageClick} className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
