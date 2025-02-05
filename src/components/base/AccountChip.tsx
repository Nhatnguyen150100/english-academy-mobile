import { IAccountType } from '@src/types/user.types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

interface AccountChipProps {
  accountType: IAccountType;
}

const AccountChip: React.FC<AccountChipProps> = ({ accountType }) => {
  const isPremium = accountType === 'PREMIUM';

  return (
    <Chip
      style={[styles.chip, isPremium ? styles.premiumChip : styles.freeChip]}
      textStyle={styles.chipText}
    >
      {isPremium ? 'Premium Account' : 'Free Account'}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
  },
  premiumChip: {
    backgroundColor: '#ffd700',
    borderColor: '#ff8c00',
    borderWidth: 1,
  },
  freeChip: {
    backgroundColor: '#99f6a3',
    borderColor: '#c5ef73',
    borderWidth: 1,
  },
  chipText: {
    fontSize: 10,
    color: '#000',
  },
});

export default AccountChip;