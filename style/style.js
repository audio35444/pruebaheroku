import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "margin-top": {
        "marginTop": 5
    },
    "margin-bottom": {
        "marginBottom": 5
    },
    "margin-left": {
        "marginLeft": 5
    },
    "margin-right": {
        "marginRight": 5
    },
    "fade-enter": {
        "transform": "rotateX(45deg) rotateZ(45deg)",
        "opacity": 0
    },
    "fade-enter-active": {
        "transform": "rotateX(0deg) rotateZ(0deg)",
        "opacity": 1,
        "transition": ".5s ease-in all"
    },
    "fade-leave": {
        "opacity": 1
    },
    "fade-leave-active": {
        "opacity": 0,
        "transition": ".5s ease-out all"
    },
    "flex-direction-horizontal": {
        "flexDirection": "column"
    }
});