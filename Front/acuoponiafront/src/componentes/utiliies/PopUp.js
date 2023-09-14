import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useStateValue } from '../../contexto/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PopUp = (props) => {
    const[{openPopup}, dispatch] = useStateValue();
    const [open, setOpen] = React.useState(props.param.open);
    const handleClose = () => {
      setOpen(false)
      dispatch({
        type : "Close",
        popup : {
            open : false,
            mensajeTitulo : '',
            mensaje : ''
        }
    })
    }

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.param.textoTitulo}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.param.textoMostrar}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
};

export default PopUp;