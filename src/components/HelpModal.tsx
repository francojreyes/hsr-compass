import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import { styled } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';

import usageDiagram from '../assets/help.png'

const StyledOl = styled('ol')({
  '& > li::marker': {
    fontWeight: 'bold'
  }
})

interface HelpModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, setOpen }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalOverflow>
      <ModalDialog
        variant="outlined"
        layout='center'
        sx={{
          width: 800,
          borderRadius: 'md',
          p: 3,
          m: 2,
          boxShadow: 'lg',
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          fontWeight="lg"
          mb={1}
        >
          How to use
        </Typography>
        <Typography
          component="h3"
          level="h5"
          fontWeight="lg"
          mb={1}
        >
          Input puzzle information
        </Typography>
        <AspectRatio sx={{ width: '100%'}}>
          <img alt='usage diagram' src={usageDiagram}/>
        </AspectRatio>
        <StyledOl>
          <li>Select the initial position of the ring.</li>
          <li>Select how many circles are lit, which determines how much the ring rotates.</li>
          <li>Select the rotation direction, indicated by the 'arrows' on the ring.</li>
          <li>Fill in the different ring combinations you can Switch between (in any order).</li>
        </StyledOl>
        <Typography
          component="h3"
          level="h5"
          fontWeight="lg"
          mb={1}
        >
          Solution
        </Typography>
        <Typography gutterBottom>Hit the 'Solve' button to see the solution.</Typography>
        <Typography gutterBottom>Solutions describe how many times you need to rotate each ring combination. This corresponds to the ring combinations you filled in.</Typography>
        <Typography>If no solution is found, you may have input incorrect information.</Typography>
      </ModalDialog>
      </ModalOverflow>
    </Modal>
  )
}

export default HelpModal;