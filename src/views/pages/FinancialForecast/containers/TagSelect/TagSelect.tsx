import React, { Component } from 'react';
import Select from 'react-select/lib/Creatable';
import chroma from 'chroma-js';

import { Tag } from 'models/Tag';

interface Props {
  tags: Tag[],
  tagsSelected: Tag[],
  onChange: (value: any) => void
  createTag: (tag: Tag) => void
  classNamePrefix?: string
}

interface State {
}

const colorStyles = {
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = chroma(data.color || 'grey');
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = data.color || 'grey';
    const bgColor = chroma(color);
    return {
      ...styles,
      backgroundColor: bgColor.alpha(0.1).css(),
      color
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color || 'grey',
  }),
}

export default class TagSelect extends Component<Props, State>{

  render() {
    const { tagsSelected, tags, createTag, onChange, ...props } = this.props;

    return (
      <Select
        {...props}
        isMulti
        value={tagsSelected}
        options={[{ label: 'Unsassigned', value: 'null' }, ...tags]}
        placeholder={"Select tags"}
        onChange={value => {
          onChange(value);
        }}
        onCreateOption={newOptionLabel => {
          const newOption = { label: newOptionLabel, value: newOptionLabel.toLowerCase() }
          createTag(newOption);
          onChange([...tagsSelected, newOption]);
        }}
        styles={colorStyles}
      />
    );
  }
};
