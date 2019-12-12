import React, { Component } from 'react';
import Select from 'react-select/lib/Creatable';
import chroma from 'chroma-js';

import { Tag } from 'models/Tag';

interface Props {
  tags: Tag[],
  tagsSelected: string[],
  onChange: (value: any) => void
  createTag: (tag: Tag) => void
  classNamePrefix?: string
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

export default class TagSelect extends Component<Props>{

  findTagById = (tagId: string) => {
    const tag = this.props.tags.find(tag => tag.id === tagId);

    if (!tag) {
      return;
    }

    return {
      ...tag,
      value: tag.id
    };
  }

  render() {
    const { tagsSelected, tags, createTag, onChange, ...props } = this.props;

    let value: any[] = [];

    if (tagsSelected) {
      value = tagsSelected.map(tag => this.findTagById(tag)).filter(v => v);
    }

    return (
      <Select
        {...props}
        isMulti
        value={value}
        options={[{ label: 'Unsassigned', value: 'null' }, ...tags.map(tag => ({ ...tag, value: tag.id }))]}
        placeholder={"Select tags"}
        onChange={(value) => {
          if (value) {
            onChange(value.map((value: any) => value.value));
          } else {
            onChange([]);
          }
        }}
        onCreateOption={newOptionLabel => {
          const newOption = { label: newOptionLabel, id: newOptionLabel.toLowerCase() }
          createTag(newOption);
          onChange([...tagsSelected, newOption.id]);
        }}
        styles={colorStyles}
      />
    );
  }
};
