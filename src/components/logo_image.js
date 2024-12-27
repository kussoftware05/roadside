import React, { Component } from 'react'
import { Image } from 'react-native'
import { scale, verticalScale } from '../components/scale';
var imgSrc = require('../images/logo.png')

const LogoImage = () => (
    <Image source = { imgSrc }  
    style={{width:scale(300), height:verticalScale(200), marginTop:20}}  
    resizeMode='center' />
)
export default LogoImage