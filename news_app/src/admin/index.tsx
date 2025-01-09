import {
  useState,
  useEffect
} from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Button
} from "@/components/ui/button";

import {
  NewsItem
} from "@/types";

import {
  getNewsItems,
} from '@/admin/actions';

export default function Index() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getNewsItems(page).then(data => {
      setNewsItems(data);
    })
  }, [page]);

  const navigateToPage = (n: number) => {
    setPage(n);
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Created On</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {newsItems.map(newsItem => (
          <TableRow key={newsItem.id}>
            <TableCell className="font-medium">{newsItem.id}</TableCell>
            <TableCell>{newsItem.title}</TableCell>
            <TableCell className="text-right">{newsItem.created_on}</TableCell>
          </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          1-18 of 1000.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToPage(page - 1)}
            disabled={ page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
  