import React from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

const AuthForm = ({ title, fields, onSubmit, footer }) => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {fields.map(({ label, type, value, onChange, required }, index) => (
            <TextField
              key={index}
              label={label}
              variant="outlined"
              type={type}
              value={value}
              onChange={onChange}
              required={required}
            />
          ))}
          <Button type="submit" variant="contained" color="primary">
            {title}
          </Button>
        </Box>
        {footer && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">{footer}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
