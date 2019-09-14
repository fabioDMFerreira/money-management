import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ReactTableDefaults } from 'react-table';

// Drag and drop table rows - https://codesandbox.io/s/1844xzjvp7

export const DragTrComponent = dragDisabled => class DragTrComponent extends React.Component {
  render() {
    const { children = null, rowInfo, className } = this.props;
    if (rowInfo) {
      const { original, index } = rowInfo;
      const { id } = original;
      return (
        <Draggable key={id} index={index} draggableId={id} isDragDisabled={dragDisabled}>
          {(draggableProvided, draggableSnapshot) => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}

            >
              <ReactTableDefaults.TrComponent style={{ width: '100%' }}   className={className || ''}>
                {children}
              </ReactTableDefaults.TrComponent>
            </div>
          )}
        </Draggable>
      );
    } else
      return (
        <ReactTableDefaults.TrComponent className={className || ''}>
          {children}
        </ReactTableDefaults.TrComponent>
      );
  }
}

export const DropTbodyComponent = dropDisabled => class DropTbodyComponent extends React.Component {
  render() {
    const { children = null } = this.props;

    return (
      <Droppable droppableId="droppable" isDropDisabled={dropDisabled}>
        {(droppableProvided, droppableSnapshot) => (
          <div ref={droppableProvided.innerRef}>
            <ReactTableDefaults.TbodyComponent  >
              {children}
            </ReactTableDefaults.TbodyComponent>
          </div>
        )}
      </Droppable>
    );
  }
}
