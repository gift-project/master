import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ border: "2px solid black", width: "40%", height: "60vh", margin: "5%" }}>사이트 소개말</div>
        <div style={{ border: "2px solid black", width: "100%", height: "10vh", boxSizing: "border-box" }}>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                With a start adornment
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              id="input-with-icon-textfield"
              label="TextField"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="With sx" variant="standard" />
            </Box>
          </Box>
        </div>
      </div>
    </>
  )
}
