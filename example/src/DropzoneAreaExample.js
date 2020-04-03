import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import {withStyles} from '@material-ui/core/styles';

const styles = {
  item: {
      zIndex: 20
  },
};

class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    const {classes} = this.props;

    return (
      <DropzoneArea 
        onChange={this.handleChange.bind(this)}
        previewGridProps={{container: {spacing: 1}, item: {xs: 6}}}
        previewGridClasses={{item: classes.item}}
        />
    )  
  }
} 

export default withStyles(styles)(DropzoneAreaExample);