import create from 'zustand';
import {Alert} from 'react-native';
import {persist} from 'zustand/middleware';

import {api} from '../shared';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDeliveryStore = create(
  persist(
    (set, get) => ({
      offset: 0,
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: [],
      getDeliveries: async () => {
        set({isLoading: true, isError: false, isSuccess: false});

        try {
          const initialOffset = 0;
          const res = await api.getDeliveries(initialOffset);

          const finalData = res.data.map(item => {
            return {
              ...item,
              isFavorite: false,
            };
          });

          set(state => ({
            isLoading: false,
            isError: false,
            isSuccess: true,
            offset: res.data.length,
            data: finalData,
          }));
        } catch (err) {
          Alert.alert('Notification', `Error getting deliveries.`);
          set(state => ({
            isLoading: false,
            isError: true,
            isSuccess: false,
          }));
        }
      },
      loadMoreDeliveries: async () => {
        set({isLoading: true, isError: false, isSuccess: false});

        try {
          const res = await api.getDeliveries(get().Offset);
          const finalData = res.data.map(item => {
            return {
              ...item,
              isFavorite: false,
            };
          });

          set(state => ({
            isLoading: false,
            isError: false,
            isSuccess: true,
            offset: res.data.length,
            data: [...state.data, ...finalData],
          }));
        } catch (err) {
          Alert.alert('Notification', `Error getting deliveries.`);
          set(state => ({
            isLoading: false,
            isError: true,
            isSuccess: false,
          }));
        }
      },
      handleFavourite: itemId => {
        set(state => ({
          data: state.data.map(item =>
            item.id === itemId
              ? {
                  ...item,
                  isFavorite: !item.isFavorite,
                }
              : item,
          ),
        }));
      },
    }),
    {
      name: 'delivery-storage', // unique name
      getStorage: () => AsyncStorage,
    },
  ),
);

export default useDeliveryStore;
