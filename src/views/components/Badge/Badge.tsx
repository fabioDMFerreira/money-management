import React from 'react';
import Badge from 'reactstrap/lib/Badge';
import chroma from 'chroma-js';

interface Props {
  label: string,
  color?: string,
}

export default ({ label, color = 'grey' }: Props) => {
  const chromaColor = chroma(color || 'grey');

  return (
    <Badge style={{
      backgroundColor: chromaColor.alpha(0.1).css(),
      color,
      fontSize: '0.8rem',
      lineHeight: '1.5rem'
    }}>{label}</Badge>
  );
}
