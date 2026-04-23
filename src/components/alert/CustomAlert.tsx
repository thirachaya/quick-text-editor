'use client'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

type Props = {
  open: boolean
  message: string
  severity?: 'success' | 'error' | 'warning' | 'info'
  onClose: () => void
}

export default function CustomAlert({
  open,
  message,
  severity = 'success',
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity} onClose={onClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}