import { ReactNode } from 'react';

type TableCell = { data: string | number; textColor?: string; renderFn?: () => ReactNode };
export type TableRow = TableCell[];
