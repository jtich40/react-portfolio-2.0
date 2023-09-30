import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';


export default function Footer() {
  return (
    <div className="flex justify-evenly my-10">
      <a 
      href="https://github.com/jtich40" 
      target="_blank" 
      rel="noreferrer"
      title="GitHub"
      >
      <GitHubIcon fontSize="medium" />
      </a>
      <a href="https://www.linkedin.com/in/jared-tichacek/"
      target="_blank"
      rel="noreferrer"
      title="LinkedIn"
      >
      <LinkedInIcon color="primary" fontSize="medium" />
      </a>
      <a href="https://twitter.com/J_Tich40"
      target="_blank"
      rel="noreferrer"
      title="Twitter"
      >
      <TwitterIcon color="primary" fontSize="medium" />
      </a>
      <a href="mailto:jared.tichacek@gmail.com"
      target="_blank"
      rel="noreferrer"
      title="Email"
      >
      <EmailIcon fontSize="medium" />
      </a>
    </div>
  )
}
