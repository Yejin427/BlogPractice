import React, { Component } from "react";
import styles from './EditorTemplate.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class EditorTemplate extends Component{
  state ={
    leftPercentage: 0.5
  }

  //separator 클릭 후 마우스 움직이면 leftpercentage 업데이트
  handleMouseMove = (e) =>{
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    });
  }

  handleMouseUp = (e) =>{ //event 제거
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleSeparatorMouseDown = (e) =>{  //separator 클릭할 때
    document.body.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { header, editor, preview } = this.props;
    const {leftPercentage} = this.state;
    const {handleSeparatorMouseDown} = this;

    const leftStyle = {
      flex: leftPercentage
    };
    const rightStyle = {
      flex: 1 - leftPercentage
    };

    // separator 위치 설정
    const separatorStyle = {
      left: `${leftPercentage * 100}%`
    };
    return(
      <div className={cx('editor-template')}>
        { header }
        <div className={cx('panes')}>
          <div className={cx('pane', 'editor')} style={leftStyle}>
            {editor}
          </div>
          <div className={cx('pane', 'preview')} style={rightStyle}>
            {preview}
          </div>
          <div
            className={cx('separator')}
            style={separatorStyle}
            onMouseDown={handleSeparatorMouseDown}/>
        </div>
      </div>
    );
  }
}

export default EditorTemplate;