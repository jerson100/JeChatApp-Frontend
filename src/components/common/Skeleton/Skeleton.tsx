import React, {FC, useEffect, useMemo, useRef} from 'react';
import {Animated, StyleSheet, StyleProp, ViewStyle} from 'react-native';

type CircleSkeletonProps = {isCircle?: true; width?: number};
type RectangleSkeletonProps = {
  isCircle?: false;
  width?: number;
  height?: number;
};

type SkeletonProps = (CircleSkeletonProps | RectangleSkeletonProps) & {
  bgColor?: string;
};

const Skeleton: FC<SkeletonProps> = ({
  bgColor = '#e1e2e4',
  isCircle = false,
  ...props
}) => {
  const opacityRef = useRef(new Animated.Value(0.3));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityRef.current, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityRef.current, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);
  const memoStyles: StyleProp<ViewStyle> = useMemo(() => {
    const _styles: StyleProp<ViewStyle> = {
      height: 52,
      width: '100%',
    };
    if (isCircle) {
      const {width} = props as CircleSkeletonProps;
      if (width) {
        _styles['height'] = width;
        _styles['width'] = width;
      }
      _styles['borderRadius'] = width ? width / 2 : 26;
    } else {
      const {width, height} = props as RectangleSkeletonProps;
      if (width) {
        _styles['width'] = width;
      }
      if (height) {
        _styles['height'] = height;
      }
    }
    _styles['backgroundColor'] = bgColor;
    return _styles;
  }, [bgColor, props]);
  return (
    <Animated.View
      style={[
        styles.container,
        memoStyles,
        {
          opacity: opacityRef.current,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Skeleton;
