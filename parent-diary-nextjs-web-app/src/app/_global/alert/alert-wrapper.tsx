import { Collapse } from "react-bootstrap";
import Alert from "react-bootstrap/esm/Alert";

type AlertWrapperProps = {
  variant: string;
  message: string;
  setShow: (show: boolean) => void;
  show: boolean;
};

export default function AlertWrapper({
  variant,
  message,
  setShow,
  show,
}: AlertWrapperProps) {
  if (!show) return <></>;
  else return (
    <Collapse appear={true} in={show}>
      <Alert
        className="fixed-top"
        onClose={() => setShow(false)}
        variant={variant}
        dismissible
      >
        {message}
      </Alert>
    </Collapse>
  );
}
