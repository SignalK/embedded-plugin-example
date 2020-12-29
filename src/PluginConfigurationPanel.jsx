import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";

export default (props) => {
  const [aBooleanField, setBooleanField] = useState(
    (props.configuration || {}).aBooleanField || false
  );
  const [aTextField, setTextField] = useState(
    (props.configuration || {}).aTextField
  );
  const [serverCallResult, setServerCallResult] = useState("-");
  const [error, setError] = useState();
  return (
    <Row>
      <Col>Column with some text in it</Col>
      <Col>
        Another column with the config form
        <Form>
          A boolean field
          <Label className="switch switch-text switch-primary">
            <Input
              type="checkbox"
              name="enabled"
              className="switch-input"
              onChange={(e) => {
                setBooleanField(!aBooleanField);
              }}
              checked={aBooleanField}
            />
            <span className="switch-label" data-on="Yes" data-off="No" />
            <span className="switch-handle" />
          </Label>
          <Input
            type="text"
            onChange={(e) => setTextField(e.target.value)}
            value={aTextField}
          />
          <Button
            onClick={() => {
              props.save({ aBooleanField, aTextField });
            }}
          >
            Save
          </Button>
        </Form>
      </Col>
      <Col>
        Third column with a button that calls plugin's http endpoint
        <Button
          onClick={() => callPluginEndpoint(
            (result) => {
              setError();
              setServerCallResult(result);
            },
            (error) => {
              setError(error);
              setServerCallResult();
            }
          )}
        >
          Do It!
        </Button>
        {JSON.stringify(serverCallResult)}
        {error && <span style={{ color: "red" }}>{error.message}</span>}
      </Col>
    </Row>
  );
};

function callPluginEndpoint(onResult, onError) {
  fetch("/plugins/_signalk_embedded_plugin_example/doit", {
    credentials: "include",
  })
    .then((r) => r.json())
    .then(onResult)
    .catch(onError);
}
