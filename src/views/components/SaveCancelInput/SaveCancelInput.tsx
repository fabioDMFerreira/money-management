import React, { useState } from 'react';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import styled from 'styled-components';

interface Props {
  initialValue: string;
  cancel: () => void;
  save: (value: string) => void;
}

const SaveCancelContainer = styled.p`
text-align: right;
margin-top: 5px;
button{
  margin: 0px 10px 0px 0px;
}
`;

export default ({ cancel, save, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Form>
      <Input
        value={value}
        autoFocus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
      <SaveCancelContainer>
        <Button type="submit" size="sm" color="link" onClick={() => save(value)}>Save</Button>
        <Button type="button" size="sm" color="link" onClick={() => cancel()}>Cancel</Button>
      </SaveCancelContainer>
    </Form>
  );
};
