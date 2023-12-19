import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';

import { Colors } from '@/constants/color';
import Conditional from '@/hocs/Conditional';

interface ReviewStartListProps {
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewStartList: React.FC<ReviewStartListProps> = ({ star, setStar }) => {
  const stars = useMemo(
    () =>
      _(Array(5))
        .map((value, index) => index < star)
        .value(),
    [star]
  );

  const handleOnPress = useCallback((index: number) => {
    return () => setStar(index + 1);
  }, []);

  const keyExtractor = useCallback((item, index) => index, []);

  const renderItem = useCallback<ListRenderItem<boolean>>(
    ({ item, index }) => (
      <TouchableOpacity
        style={styles.starContainer}
        onPress={handleOnPress(index)}
        activeOpacity={0.8}
      >
        <Conditional condition={item}>
          <AntDesign name="star" size={36} color={Colors.primary} />
        </Conditional>

        <Conditional condition={!item}>
          <AntDesign name="staro" size={36} color={Colors.primary} />
        </Conditional>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <FlatList<boolean>
      style={styles.container}
      data={stars}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      scrollEnabled={false}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  starContainer: {
    paddingHorizontal: 10,
  },
});

export default ReviewStartList;
