### What

Workaround for the issue https://github.com/TanStack/table/issues/4754.

Once fixed - you don't need this package.

### How

Just wrap your columns with `fixDeepAccessorColumnIds` function call.
Supports nested columns also (column groups).

```typescript
import { fixDeepAccessorColumnIds } from 'tanstack-table-deep-accessor-key-workaround';

// ...

const columns = fixDeepAccessorColumnIds([
  columnHelper.group({
    header: 'Person',
    columns: [
      // will have id "person_info_name"
      columnHelper.accessor('person.info.name', {
        header: 'Name',
      }),
      columnHelper.accessor('person.info.email', {
        header: 'Email',
        id: 'user_email', // won't be affected since set explicitly
      }),
      // will have id "person_info_extra_notes"
      columnHelper.accessor('person.info.extra.notes', {
        header: 'Notes',
      }),
    ],
  })
]);
```

as a result - all the columns will have `id` fixed ("." replaced with "_") 
