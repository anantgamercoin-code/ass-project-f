import { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

const statusColors = {
  Pending: 'warning',
  Ready: 'info',
  Completed: 'success'
};

const paymentColors = {
  Paid: 'success',
  Unpaid: 'default'
};

export default function OrdersTable({ orders }) {
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const priority = { Ready: 0, Pending: 1, Completed: 2 };
      if (priority[a.status] !== priority[b.status]) {
        return priority[a.status] - priority[b.status];
      }
      return b.createdAt - a.createdAt;
    });
  }, [orders]);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Mobile</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>
                <Typography variant="subtitle2">{order.id}</Typography>
              </TableCell>
              <TableCell>{order.customerMobile}</TableCell>
              <TableCell>{order.description}</TableCell>
              <TableCell>
                <Chip label={order.status} color={statusColors[order.status] || 'default'} size="small" />
              </TableCell>
              <TableCell>
                <Chip label={order.paymentStatus} color={paymentColors[order.paymentStatus] || 'default'} size="small" />
              </TableCell>
              <TableCell>{order.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
