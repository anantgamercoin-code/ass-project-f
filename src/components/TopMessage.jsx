import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import Box from '@mui/material/Box';

export default function TopMessage({ message, severity = 'info', onClose }) {
  if (!message) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1500,
        width: 'min(94vw, 540px)'
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
        <Collapse in>
          <Alert
            severity={severity}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                <CloseOutlined fontSize="small" />
              </IconButton>
            }
            sx={{
              borderRadius: 2,
              boxShadow: '0 16px 40px rgba(11, 61, 145, 0.14)',
              fontSize: '0.95rem',
              p: 1.5
            }}
          >
            {message}
          </Alert>
        </Collapse>
      </motion.div>
    </Box>
  );
}

TopMessage.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  onClose: PropTypes.func
};
