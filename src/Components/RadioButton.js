import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export default function RadioButton({setSelectedRadio}) {
  const [selected, setSelected] = useState({
    one: {selected: false, value: 'Fashion'},
    two: {selected: false, value: 'Food'},
    three: {selected: false, value: 'Music'},
    four: {selected: false, value: 'Lifestyle'},
    five: {selected: false, value: 'Movies'},
    six: {selected: false, value: 'Books'},
    seven: {selected: false, value: 'Sports'},
    eight: {selected: false, value: 'Fitness'},
    nine: {selected: false, value: 'Business'},
    ten: {selected: false, value: 'Technology'},
    eleven: {selected: false, value: 'Games'},
    twelve: {selected: false, value: 'Political'},
    thirteen: {selected: false, value: 'Health'},
    fourteen: {selected: false, value: 'Religious'},
    fifhteen: {selected: false, value: 'Travel'},
  });

  const handlePress = key => {
    const cloneFood = Object.assign({}, selected);
    Object.entries(cloneFood).map(obj => {
      if (obj[0] == key) {
        obj[1].selected = true;
        setSelectedRadio(obj[1].value);
      } else {
        obj[1].selected = false;
      }
    });
    setSelected(cloneFood);
  };

  return (
    <View style={{flexDirection: 'column', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.one.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('one')}>
          <Text
            style={[
              styles.text,
              {color: selected.one.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.one.value}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.four.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('four')}>
          <Text
            style={[
              styles.text,
              {color: selected.four.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.four.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.five.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('five')}>
          <Text
            style={[
              styles.text,
              {color: selected.five.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.five.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.six.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('six')}>
          <Text
            style={[
              styles.text,
              {color: selected.six.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.six.value}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.seven.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('seven')}>
          <Text
            style={[
              styles.text,
              {color: selected.seven.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.seven.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.three.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('three')}>
          <Text
            style={[
              styles.text,
              {color: selected.three.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.three.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.eight.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('eight')}>
          <Text
            style={[
              styles.text,
              {color: selected.eight.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.eight.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.nine.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('nine')}>
          <Text
            style={[
              styles.text,
              {color: selected.nine.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.nine.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.ten.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('ten')}>
          <Text
            style={[
              styles.text,
              {color: selected.ten.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.ten.value}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.eleven.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('eleven')}>
          <Text
            style={[
              styles.text,
              {color: selected.eleven.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.eleven.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.two.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('two')}>
          <Text
            style={[
              styles.text,
              {color: selected.two.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.two.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {backgroundColor: selected.twelve.selected ? '#2B2B2E' : '#E5E5EA'},
          ]}
          onPress={() => handlePress('twelve')}>
          <Text
            style={[
              styles.text,
              {color: selected.twelve.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.twelve.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              backgroundColor: selected.thirteen.selected
                ? '#2B2B2E'
                : '#E5E5EA',
            },
          ]}
          onPress={() => handlePress('thirteen')}>
          <Text
            style={[
              styles.text,
              {color: selected.thirteen.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.thirteen.value}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              backgroundColor: selected.fourteen.selected
                ? '#2B2B2E'
                : '#E5E5EA',
            },
          ]}
          onPress={() => handlePress('fourteen')}>
          <Text
            style={[
              styles.text,
              {color: selected.fourteen.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.fourteen.value}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.button,
            {
              backgroundColor: selected.fifhteen.selected
                ? '#2B2B2E'
                : '#E5E5EA',
            },
          ]}
          onPress={() => handlePress('fifhteen')}>
          <Text
            style={[
              styles.text,
              {color: selected.fifhteen.selected ? '#FAFAFC' : '#2B2B2E'},
            ]}>
            {selected.fifhteen.value}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: '1%',
    marginTop: '1%',
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: '1%',
    margin: 3,
  },
  text: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 14.5,
    padding: '1.3%',
    paddingBottom: '0.7%',
    paddingTop: '0.7%',
    textAlign: 'center',
  },
});
