import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function ButtonIcon({ icon, onClick }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete" onClick={onClick}>
        {icon}
      </IconButton>
    </Stack>
  );
}