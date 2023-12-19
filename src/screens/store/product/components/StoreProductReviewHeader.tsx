import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/color';
import { AntDesign } from '@expo/vector-icons';
import SizedBox from '@/components/SizedBox';

interface StoreProductReviewHeaderProps {
  score: number;
  total: number;
}

const StoreProductReviewHeader: React.FC<StoreProductReviewHeaderProps> = ({
  score,
  total,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreInnerContainer}>
          <AntDesign name="star" size={22} color={Colors.primary} />

          <SizedBox width={6} />

          <Text style={styles.score}>{score?.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.count}>리뷰 {total}개</Text>

        <Text style={styles.order}>최신순</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
  },
  scoreContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  scoreInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontWeight: '600',
    fontSize: 28,
    color: Colors.black,
  },
  reviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.black,
  },
  order: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.darkGray,
  },
});

export default StoreProductReviewHeader;
