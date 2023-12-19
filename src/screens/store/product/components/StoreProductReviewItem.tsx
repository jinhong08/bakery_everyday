import React, { useCallback } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { Review } from '@/domain/review';
import { Colors } from '@/constants/color';
import { File } from '@/domain/file';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';

interface StoreProductReviewItemProps {
  review: Review;
}

const StoreProductReviewItem: React.FC<StoreProductReviewItemProps> = ({
  review,
}) => {
  const keyExtractor = useCallback((item: File) => item.id, []);

  const renderItem = useCallback<ListRenderItem<File>>(
    ({ item }) => <Image style={styles.image} source={{ uri: item.url }} />,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomImage
          style={styles.profileImage}
          imageUrl={review.member?.profileImageUrl}
          width={50}
          height={50}
        />

        <SizedBox width={10} />

        <View style={styles.headerInfoContainer}>
          <Text style={styles.name}>{review.member.name}</Text>

          <SizedBox height={4} />

          <Text style={styles.time}>
            {dayjs(review.createdAt).format('YY.MM.DD')}
          </Text>
        </View>

        <View style={styles.starContainer}>
          <AntDesign name="star" size={18} color={Colors.primary} />

          <SizedBox width={6} />

          <Text style={styles.score}>{review.score.toFixed(1)}</Text>
        </View>
      </View>

      <SizedBox height={24} />

      <Text style={styles.content}>{review.content}</Text>

      <SizedBox height={12} />

      <FlatList<File>
        data={review.attachment}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileImage: {
    borderRadius: 100,
  },
  name: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.black,
  },
  time: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.darkGray,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontWeight: '500',
    fontSize: 18,
    color: Colors.black,
  },
  content: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.black,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default StoreProductReviewItem;
