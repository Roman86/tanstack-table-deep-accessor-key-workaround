import type {AccessorKeyColumnDef, ColumnDef, GroupColumnDef} from '@tanstack/react-table';

/**
 * This helper is a workaround for the {@link https://github.com/TanStack/table/issues/4754 issue}
 */
export function fixDeepAccessorColumnIds<A extends Array<ColumnDef<any>>>(columns: A): A {
  // recursively iterate over all columns and fix their ids
  columns.forEach((col) => {
    if (col.id == null) {
      const accKey: any = (col as AccessorKeyColumnDef<any>).accessorKey;
      if (typeof accKey === 'string' && accKey) {
        col.id = accKey.replace(/\./g, '_');
      }
    }
    const subCols = (col as GroupColumnDef<any>).columns;
    if (Array.isArray(subCols) && subCols.length > 0) {
      fixDeepAccessorColumnIds(subCols);
    }
  });
  return columns;
}
