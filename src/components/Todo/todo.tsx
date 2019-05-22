import * as React from "react";
import "./todo.css";

import { IRectangle } from '@uifabric/utilities';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';

export interface ITodoItem {
  Item: string;
  Done: boolean;
}

export interface ITodoProps {
  Todos: ITodoItem[];
  handleTodoClick(i: number): any;
  handleDeleteClick(i: number): any;
}

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

class Todo extends React.Component<ITodoProps, {}> {
  private columnCount: number;
  private columnWidth: number;
  private rowHeight: number;

  constructor(props: ITodoProps) {
    super(props);
  }

  public handleItemClick(i: number): any {
    this.props.handleTodoClick(i);
  }

  public handleDeleteClick(i: number): any {
    this.props.handleDeleteClick(i);
  }

  public render() {
    return (
        <List
          className='ms-TodoGrid'
          items={this.props.Todos}
          onRenderCell={this.OnRenderCell}
          getItemCountForPage={this.GetItemCountForPage}
          getPageHeight={this.GetPageHeight}
          renderedWindowsAhead={4}
        />
    );
  }

  private GetItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this.columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this.columnWidth = Math.floor(surfaceRect.width / this.columnCount);
      this.rowHeight = this.columnWidth;
    }
    return this.columnCount * ROWS_PER_PAGE;
  };

  private GetPageHeight = (): number => {
    return this.rowHeight * ROWS_PER_PAGE;
  };

  private OnRenderCell = (item: any, index: number | undefined): JSX.Element => {
    let doneClass = 'ms-TodoGrid-tile todoDone';
    if(!item.Done) {
      doneClass = 'ms-TodoGrid-tile todoUndone';
    }

    return (
      <div>
        <div
          className={doneClass}
          data-is-focusable={true}
          style={{
            width: 100 / this.columnCount + "%"
          }}
        >
        <div className="ms-TodoGrid-delete" onClick={this.handleDeleteClick.bind(this, index)}>
          <Icon iconName='delete' />
        </div>
          <div className="ms-TodoGrid-sizer" onClick={this.handleItemClick.bind(this, index)}>
            <div className="ms-TodoGrid-padder">
              <span className="ms-TodoGrid-label">{item.Item}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
