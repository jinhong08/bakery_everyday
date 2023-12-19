import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';

import { Colors } from '@/constants/color';
import { Order } from '@/domain/order';
import CustomImage from '@/components/CustomImage';
import SizedBox from '@/components/SizedBox';

interface ProfileStoreOrderItemProps {
  order: Order;
}

const ProfileStoreOrderItem: React.FC<ProfileStoreOrderItemProps> = ({
  order,
}) => {
  return (
    <View style={styles.container}>
      <CustomImage
        style={styles.image}
        imageUrl={order.product?.image?.url}
        width={80}
        height={80}
      />

      <SizedBox width={10} />

      <View style={styles.infoContainer}>
        <Text style={styles.product}>{order.product.name}</Text>

        <SizedBox height={2} />

        <Text style={styles.member}>{order.member.name} 님</Text>

        <SizedBox height={2} />

        <Text style={styles.time}>
          {dayjs(order.createdAt).format('YY년 MM일 DD일')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
  image: {
    borderRadius: 5,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  product: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.black,
  },
  member: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.darkGray,
  },
  time: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.darkGray,
  },
});

export default ProfileStoreOrderItem;
