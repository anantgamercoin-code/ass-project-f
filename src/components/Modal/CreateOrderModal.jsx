import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CreateOrderModal({ open, onClose, onCreate }) {
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!mobile || !description) return;
    onCreate({ customerMobile: mobile.trim(), description: description.trim() });
    setMobile('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Order</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Customer Mobile Number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            fullWidth
          />
          <TextField
            label="Order Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate} disabled={!mobile || !description}>
          Add Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}
