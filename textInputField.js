import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles/base_styles.js';
const TextFieldInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
const { inputStyle, containerStyle } = styles;
return (
        <View style={styles.containerStyle}>

            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput
                autoCorrect={false}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={styles.inputStyle}
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
            />
        </View>
    );
};
export default TextFieldInput;
