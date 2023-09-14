import { Card,CardContent } from '@mui/material';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
//

const ControlledPopup = ({mensaje}) => {
  const [open, setOpen] = useState(true);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <Popup open={open} 
        closeOnDocumentClick 
        onClose={closeModal}>
        <Card>
            <CardContent>
                <div className="modal">
                    <a className="close" 
                    onClick={closeModal}>
                        &times;
                    </a>
                {mensaje}
                </div>
            </CardContent>
        </Card>
      </Popup>
    </div>
  );
};

export default ControlledPopup;