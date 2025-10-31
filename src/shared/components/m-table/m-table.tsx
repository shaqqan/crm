import { MantineReactTable } from 'mantine-react-table';
import { HiOutlinePencil, HiOutlinePlus, HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi';
import { Button, Flex, Stack, Text, TextInput } from '@mantine/core';
import styles from './table.module.css';

interface TableProps extends Record<string, any> {
  isError?: boolean;
  loading?: boolean;
  editM?: (id: number) => void;
  deleteM?: (id: number) => void;
  createM?: () => void;
  errorText?: string;
  goTo?: (id: string) => void;
  enableRowActions?: boolean;
  rowCount?: number;
  createButtonText?: string;
}

export const MTable = ({
  loading,
  isError,
  editM,
  deleteM,
  createM,
  errorText,
  goTo,
  enableRowActions,
  createButtonText = 'Create',
  ...otherProps
}: TableProps) => {
  return (
    <Stack className={styles.tableWrapper}>
      {isError && (
        <Text c="red" size="sm">
          {errorText}
        </Text>
      )}

      <MantineReactTable
        columns={otherProps.columns}
        data={otherProps.data}
        enableColumnActions
        enableTableFooter
        enableStickyHeader
        enableBottomToolbar
        enablePagination
        paginationDisplayMode="pages"
        enableRowNumbers
        enableFullScreenToggle
        enableColumnFilters
        enableHiding
        enableDensityToggle={false}
        enableRowActions={enableRowActions}
        mantineLoadingOverlayProps={{
          loaderProps: {
            color: 'var(--mantine-color-primary-6)',
          },
        }}
        mantineTableBodyRowProps={({ row }) => ({
          onClick: () => {
            if (goTo !== undefined) {
              const id = (row.original as any).id;
              goTo(id);
            }
          },
        })}
        initialState={{
          isLoading: loading,
          density: 'xs',
          showGlobalFilter: true,
        }}
        mantineTableProps={{
          highlightOnHover: false,
        }}
        mantineTableHeadCellProps={{
          style: {
            backgroundColor: 'var(--mantine-color-grayscales-1)',
          },
        }}
        mantineTableBodyCellProps={{
          style: {},
        }}
        renderRowActions={({ row }) => (
          <Flex>
            {editM && (
              <Button
                variant="transparent"
                p={0}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  const id = (row.original as any).id;
                  editM(id);
                }}
              >
                <HiOutlinePencil size={24} color="#D97706" />
              </Button>
            )}
            {deleteM && (
              <Button
                variant="transparent"
                p={0}
                ml={10}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  const id = (row.original as any).id;
                  deleteM(id);
                }}
              >
                <HiOutlineTrash size={24} color="#E11D48" />
              </Button>
            )}
          </Flex>
        )}
        renderTopToolbar={({ table }) => (
          <Flex p="md" justify="space-between" align="center">
            <Flex style={{ flex: 1 }}>
              {table.refs.searchInputRef && (
                <div style={{ width: '300px' }}>
                  {table.getState().showGlobalFilter && (
                    <TextInput
                      placeholder="Search..."
                      rightSection={<HiOutlineSearch size={20} />}
                    />
                  )}
                </div>
              )}
            </Flex>
            <Flex gap="sm">
              {createM && (
                <Button
                  variant="filled"
                  leftSection={<HiOutlinePlus size={20} />}
                  onClick={createM}
                >
                  {createButtonText}
                </Button>
              )}
            </Flex>
          </Flex>
        )}
        positionActionsColumn="last"
        mantinePaperProps={{
          shadow: 'none',
          withBorder: false,
          style: {
            border: 'none',
          },
        }}
        mantineTableContainerProps={{ style: { flexGrow: '1' } }}
        mantineTableFooterProps={{ style: { flexGrow: '0' } }}
        mantinePaginationProps={{
          color: 'var(--mantine-color-primary-6)',
          showRowsPerPage: true,
        }}
        renderBottomToolbarCustomActions={() => (
          <Text ml="auto" mr="5px">
            Total: {otherProps.rowCount}
          </Text>
        )}
        {...otherProps}
      />
    </Stack>
  );
};
