// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';

// assets
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import SmileOutlined from '@ant-design/icons/SmileOutlined';

// ==============================|| SAMPLE PAGE ||============================== //

const featureItems = [
  { title: 'Modern Interface', description: 'Clean layout with responsive widgets for any workspace.' },
  { title: 'Fast Performance', description: 'Optimized Vite build and lightweight frontend architecture.' },
  { title: 'Customizable Layout', description: 'Easy-to-extend dashboard structure and navigation.' }
];

export default function SamplePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome to the Dashboard
              </Typography>
              <Typography color="textSecondary">
                This frontend-only React dashboard is built with Vite, Material UI, and modern React hooks.
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained">Get Started</Button>
              <Button variant="outlined">View Reports</Button>
            </Stack>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={8}>
        <MainCard title="Dashboard Overview">
          <Typography color="textSecondary">
            Complete website navigation with all menus and polished frontend pages for fast prototyping.
          </Typography>
          <Box sx={{ mt: 2, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            {featureItems.map((feature) => (
              <Box key={feature.title} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <MainCard title="Quick Stats">
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleOutlined style={{ color: '#22c55e' }} />
              <Typography>100% frontend-only experience</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TeamOutlined style={{ color: '#2563eb' }} />
              <Typography>Fully responsive and deploy ready</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmileOutlined style={{ color: '#f59e0b' }} />
              <Typography>Clean modern design for all pages</Typography>
            </Box>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
