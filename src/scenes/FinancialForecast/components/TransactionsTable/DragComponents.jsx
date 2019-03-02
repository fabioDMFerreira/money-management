import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ReactTableDefaults } from 'react-table';

// Drag and drop table rows - https://codesandbox.io/s/1844xzjvp7

export class DragTrComponent extends React.Component {
  render() {
    const { children = null, rowInfo } = this.props;
    if (rowInfo) {
      const { original, index } = rowInfo;
      const { id } = original;
      return (
        <Draggable key={id} index={index} draggableId={id}>
          {(draggableProvided, draggableSnapshot) => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
            >
              <ReactTableDefaults.TrComponent style={{ width: '100%' }}>
                {children}
              </ReactTableDefaults.TrComponent>
            </div>
          )}
        </Draggable>
      );
    } else
      return (
        <ReactTableDefaults.TrComponent  >
          {children}
        </ReactTableDefaults.TrComponent>
      );
  }
}

export class DropTbodyComponent extends React.Component {
  render() {
    const { children = null } = this.props;

    return (
      <Droppable droppableId="droppable">
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
