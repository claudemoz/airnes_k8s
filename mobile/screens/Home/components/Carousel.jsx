import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Carousel = () => {
  const Images = [
    require("../../../assets/images/banner/1.png"),
    require("../../../assets/images/banner/2.png"),
    require("../../../assets/images/banner/3.png"),
  ];
  const [imgActive, setImgActive] = useState(0);
  const scrollRef = useRef(null);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );

      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = imgActive + 1;
      if (nextIndex >= Images.length) {
        nextIndex = 0;
      }
      setImgActive(nextIndex);
      scrollRef.current.scrollTo({
        x: nextIndex * WIDTH,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [imgActive]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}
      >
        {Images?.map((img, i) => (
          <Image
            key={i}
            resizeMode="stretch"
            style={styles.wrap}
            source={img}
          />
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {Images?.map((img, i) => (
          <Text key={i} style={imgActive === i ? styles.dotActive : styles.dot}>
            &#x25cf;
          </Text>
        ))}
      </View>
    </View>
  );
};
export default Carousel;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    // borderRadius: 10,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.22,
    // borderRadius: 5,
    overflow: "hidden",
  },

  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "#000",
    fontSize: 8,
  },
  dot: {
    fontSize: 8,
    margin: 3,
    color: "#ddd",
  },
});
