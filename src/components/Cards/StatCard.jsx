import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StatCard({ title, value, detail, color = 'primary.main' }) {
  return (
    <Card sx={{ minWidth: 220, borderRadius: 2, boxShadow: 2, p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color, fontWeight: 700, mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
      </CardContent>
    </Card>
  );
}
