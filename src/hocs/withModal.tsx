import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface IWithModalProps {
  showModal: boolean;
  onClose: Function;
}

const withModal = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & IWithModalProps> => ({ ...props }) => {
  const { showModal, onClose } = props;
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        className={classes.modal}
        onClose={() => onClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <Component {...props} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withModal;
