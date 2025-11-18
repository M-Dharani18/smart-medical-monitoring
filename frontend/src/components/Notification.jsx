import { Alert } from '@mui/material'
import { motion } from 'framer-motion'

function Notification({ message }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <Alert severity="info" sx={{ mb: 2, borderRadius: 10, bgcolor: '#e8f5e9' }}>
        {message} 🌱
      </Alert>
    </motion.div>
  )
}

export default Notification