'use client'

import { Snackbar, Alert } from '@mui/material'
import { useState } from 'react'

type AlertType = 'success' | 'error' | 'info' | 'warning'

export default function useToast() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertType>('success')

  const showToast = (msg: string, severity: AlertType = 'success') => {
    setMessage(msg)
    setType(severity)
    setOpen(true)
  }

  const Toast = () => (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )

  return { showToast, Toast }
}