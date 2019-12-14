import chroma from 'chroma-js';
import { Tag } from 'models/Tag';
import React, { Component } from 'react';
import Select from 'react-select/lib/Creatable';

interface Props {
  tags: Tag[];
  tagsSelected: string[];
  onChange: (value: any) => void;
  createTag: (tag: Tag) => void;
  classNamePrefix?: string;
}


const colorStyles = {
  option: (styles: any, {
    data,
    isDisabled,
    isFocused,
    isSelected,
  }: any) => {
    const generatedColor = chroma(data.color || 'grey');

    let backgroundColor;
    let color;

    if (isDisabled) {
      backgroundColor = null;
      color = '#ccc';
    }
    if (!isDisabled && isSelected) {
      backgroundColor = data.color;
      color = chroma.contrast(generatedColor, 'white') > 2
        ? 'white'
        : 'black';
    } else if (!isDisabled && !isSelected && isFocused) {
      backgroundColor = generatedColor.alpha(0.1).css();
      color = data.color;
    }

    return {
      ...styles,
      backgroundColor,
      color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : generatedColor.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles: any, { data }: any) => {
    const color = data.color || 'grey';
    const bgColor = chroma(color);
    return {
      ...styles,
      backgroundColor: bgColor.alpha(0.1).css(),
      color,
    };
  },
  multiValueLabel: (styles: any, { data }: any) => ({
    ...styles,
    color: data.color || 'grey',
  }),
};

export default class TagSelect extends Component<Props> {
  findTagById = (tagId: string) => {
    const tag = this.props.tags.find(tag => tag.id === tagId);

    if (!tag) {
      return null;
    }

    return {
      ...tag,
      value: tag.id,
    };
  }

  render() {
    const {
      tagsSelected, tags, createTag, onChange, ...props
    } = this.props;

    let value: any[] = [];

    if (tagsSelected) {
      value = tagsSelected.map((tag) => {
        if (tag === 'unassigned') {
          return { value: 'unassigned', label: 'Unassigned' };
        }
        return this.findTagById(tag);
      }).filter(v => v);
    }

    return (
      <Select
        {...props}
        isMulti
        value={value}
        options={[{ label: 'Unsassigned', value: 'unassigned' }, ...tags.map(tag => ({ ...tag, value: tag.id }))]}
        placeholder="Select tags"
        onChange={(value) => {
          if (value) {
            onChange(value.map((value: any) => value.value));
          } else {
            onChange([]);
          }
        }}
        onCreateOption={(newOptionLabel) => {
          const newOption = { label: newOptionLabel, id: newOptionLabel.toLowerCase() };
          createTag(newOption);
          onChange([...tagsSelected, newOption.id]);
        }}
        styles={colorStyles}
      />
    );
  }
}
