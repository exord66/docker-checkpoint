import React, { useState, useEffect } from 'react'
import {
  Alert,
  Button
} from 'react-bootstrap'

const AlertDismissible = ({
  variant,
  title,
  message,
  duration = 3000
}) => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), duration);
  }, [duration]);

  if (show) {
    return (
      <React.Fragment>
        {visible &&
          <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{title}</Alert.Heading>
            <p>
              {message}
            </p>
          </Alert>
        }
      </React.Fragment>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AlertDismissible