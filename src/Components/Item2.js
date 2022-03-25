import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  minus,
  clamp,
} from 'react-native-redash/lib/module/v1';
import ProfileFlatListRender, {HEIGHT} from './ProfileFlatListRender';
import Action2 from './Action2';
const {width} = Dimensions.get('window');
const snapPoints = [-width, -100, 0];
const styles = StyleSheet.create({
  background: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), {
    backgroundColor: '#FAFAFC',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  }),
});
const Item = ({item, onSwipe}) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const deleteOpacity = useValue(1);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue(0);
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(
          translateX,
          add(offsetX, clamp(translation.x, -9999, minus(offsetX))),
        ),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({from: HEIGHT, to: 0})),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [onSwipe],
  );
  return React.createElement(
    Animated.View,
    null,
    React.createElement(
      View,
      {style: styles.background},
      React.createElement(
        TouchableWithoutFeedback,
        {onPress: () => shouldRemove.setValue(1)},
        React.createElement(
          Action2,
          Object.assign({x: abs(translateX)}, {deleteOpacity}),
        ),
      ),
    ),
    React.createElement(
      PanGestureHandler,
      Object.assign(
        {failOffsetY: [-5, 5], activeOffsetX: [-5, 5]},
        gestureHandler,
      ),
      React.createElement(
        Animated.View,
        {style: {height, transform: [{translateX}]}},
        React.createElement(ProfileFlatListRender, Object.assign({}, {item})),
      ),
    ),
  );
};
export default Item;
