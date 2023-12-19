import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/color';

interface MultiImageSelectorModalHeaderProps {
  selected: number;
  onClose: () => void;
  onComplete: () => void;
}

const MultiImageSelectorModalHeader: React.FC<
  MultiImageSelectorModalHeaderProps
> = ({ selected, onClose, onComplete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>사진 선택</Text>
      </View>

      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={onClose}
        activeOpacity={0.65}
      >
        <Feather name="x" size={20} color={Colors.black} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.completeButtonContainer}
        onPress={onComplete}
        activeOpacity={0.65}
      >
        <Text style={styles.selectedCount}>{selected}</Text>

        <Text style={[styles.complete]}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.black,
  },
  closeButtonContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonContainer: {
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCount: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.primary,
    marginRight: 6,
  },
  complete: {
    fontWeight: '400',
    fontSize: 14,
  },
});

export default React.memo(MultiImageSelectorModalHeader);
