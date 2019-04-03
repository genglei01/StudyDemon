import React from 'react';
import {
  View, StyleSheet, Image, Animated,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});

export default class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = ()=>{
    Animated.timing(this.thumbnailAnimated,{
      toValue:1,
    }).start();
  }

  handleImageLoad = ()=>{
    Animated.timing(this.imageAnimated,{
      toValue:1,
    }).start();
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      ...props
    } = this.props;

    return (
      <View style={styles.container}>
        <Animated.Image
        onLoad={this.handleThumbnailLoad}
          {...props}
          source={thumbnailSource}
          style={[style,{opacity: this.thumbnailAnimated}]}
        />
        <Animated.Image
        onLoad={this.handleImageLoad}
          {...props}
          source={source}
          style={[styles.imageOverlay, style,{opacity: this.imageAnimated}]}
        />
      </View>
    );
  }
}
