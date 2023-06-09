import React, {Component} from 'react';
import EditorHeader from '../../components/editor/EditorHeader';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as editorActions from '../../store/modules/editor';

class EditorHeaderContainer extends Component{
  componentDidMount() {
    const {EditorActions} = this.props;
    EditorActions.initialize();
  }

  handleGoBack = () =>{
    const {history} = this.props;
    navigate(-1);
  }

  handleSubmit = async() =>{
    const {title, markdown, tags, EditorActions, history} = this.props;
    const post = {
      title,
      body: markdown,
      tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    };
    try{
      await EditorActions.writePost(post);
      
      //page 이동
      navigate(`/post/${this.props.postId}`);
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { handleGoBack, handleSubmit} = this;
    return(
      <EditorHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default connect(
  (state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    tags: state.editor.get('postId')
  }),
  (dispatch) =>({
    EditorActions: bindActionCreators(editorActions, dispatch)
  })
)(withRouter(EditorHeaderContainer));