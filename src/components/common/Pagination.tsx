import { Box, ButtonGroup, Button } from '@chakra-ui/react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getPageRange = ({ maxVisiable = 5, total, current }: { maxVisiable: number; total: number; current: number }) => {
  const middlePage = Math.ceil(maxVisiable / 2);
  let startPage = 1;
  let endPage;

  if (current <= maxVisiable) {
    // 是否前 maxVisible={5} 個
    startPage = 1;
    endPage = total > maxVisiable ? maxVisiable : total;
  } else {
    // 是否後 maxVisible={5} 個
    const lastSectionStart = total - maxVisiable + 1;
    const isLastSection = current > lastSectionStart;
    startPage = isLastSection ? lastSectionStart : current - middlePage + 1;
    endPage = isLastSection ? total : current + middlePage - 1;
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pageRange = getPageRange({ maxVisiable: 5, total: totalPages, current: currentPage });
  return (
    <Box>
      <ButtonGroup>
        <Button variant="pageArrow" isDisabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </Button>
        {pageRange.map((p: number) => (
          <Button
            variant={p === currentPage ? 'pageActive' : 'pageBase'}
            key={p}
            onClick={() => {
              if (p !== currentPage) {
                onPageChange(p);
              }
            }}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="pageArrow"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
