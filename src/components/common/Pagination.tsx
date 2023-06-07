import { ChakraProps, chakra } from '@chakra-ui/react';

type PaginationProps = {
  page: number;
  totalCount: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
} & ChakraProps;

// logic
const getPageRange = ({ maxVisiable, total, current }: { maxVisiable: number; total: number; current: number }) => {
  let startPage = 1;
  let endPage;

  if (current <= maxVisiable) {
    // 是否前 maxVisible={5} 個
    startPage = 1;
    endPage = total > maxVisiable ? maxVisiable : total;
  } else {
    // 是否後 maxVisible={5} 個
    const lastSectionStart = total - maxVisiable + 1;
    const isLastSection = current >= lastSectionStart;

    const leftHandNumber = maxVisiable % 2 === 0 ? Math.floor(maxVisiable / 2) : Math.ceil(maxVisiable / 2);
    const rightHandNumber = Math.ceil(maxVisiable / 2);

    startPage = isLastSection ? lastSectionStart : current - leftHandNumber + 1;
    endPage = isLastSection ? total : current + rightHandNumber - 1;
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
};

// style
const PageContainer = chakra('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    pl: 0,
  },
});

const arrowStyle = (isDisabled: boolean) => ({
  color: isDisabled ? 'natural.500' : 'natural.900',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  backgroundColor: 'transparent',
  _hover: isDisabled ? {} : { backgroundColor: 'natural.500' },
});

const itemStyle = (isActive: boolean) => ({
  backgroundColor: isActive ? 'primary.500' : 'transparent',
  color: isActive ? 'white' : 'natural.900',
  _hover: isActive ? {} : { backgroundColor: 'natural.500' },
});

const PageItem = chakra('button', {
  baseStyle: {
    listStyle: 'none',
    fontWeight: 'normal',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    minWidth: '2rem',
  },
});

const Pagination = ({ page, totalCount, pageSize = 5, onPageChange, ...props }: PaginationProps) => {
  const total = Math.ceil(totalCount / pageSize) || 1; // 最少顯示一頁
  const pageRange = getPageRange({ maxVisiable: 5, total, current: page });

  return (
    <chakra.div display="flex" justifyContent="center" {...props}>
      <PageContainer>
        <PageItem
          bgColor="red"
          {...arrowStyle(page === 1)}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </PageItem>
        {pageRange.map((p: number) => (
          <PageItem
            key={p}
            {...itemStyle(p === page)}
            onClick={() => {
              if (p !== page) {
                onPageChange(p);
              }
            }}
          >
            {p}
          </PageItem>
        ))}
        <PageItem {...arrowStyle(page === total)} onClick={() => onPageChange(page + 1)} disabled={page === total}>
          &gt;
        </PageItem>
      </PageContainer>
    </chakra.div>
  );
};

export default Pagination;
