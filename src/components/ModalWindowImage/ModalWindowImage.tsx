import { Box, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ModalImageProps = {
  src: string;
  alt: string;
};

const ModalWindowImage: React.FC<ModalImageProps> = (props) => {
  const { src, alt } = props;
  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = () => setOpen(!open);
  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={toggleModal}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90%',
            maxWidth: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            outline: 'none',
            borderRadius: '10px',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={toggleModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: "#000",
              zIndex: 1,
              fontSize: "24px"
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '10px',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModalWindowImage;