import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image, Avatar} from 'react-native-elements';

import useDeliveryStore from '../store/useDeliveryStore';

import {
  FONT_BOLD,
  FONT_REG,
  PRIMARY_COLOR,
  TEXT_COLOR,
  BACKGROUND,
  BTN_COLOR,
} from '../constants';

export default function Detail({route, navigation}) {
  const {handleFavourite} = useDeliveryStore();
  const {item} = route.params;

  const price =
    Number(item.deliveryFee.replace(/[^0-9\.-]+/g, '')) +
    Number(item.surcharge.replace(/[^0-9\.-]+/g, ''));

  return (
    <View style={styles.root}>
      <View style={styles.AppBarcontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={28} color={PRIMARY_COLOR} />
        </TouchableOpacity>

        <Text style={[styles.btnText, {paddingLeft: 100}]}>
          Delivery Details
        </Text>
      </View>
      <View style={{flex: 1, marginHorizontal: 13}}>
        <View
          style={{
            height: 130,
            width: '100%',
            backgroundColor: '#d1d1d1',
            //alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 20,
            borderRadius: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 15}}>From</Text>
            <Text
              style={{paddingLeft: '54%', fontFamily: FONT_REG, fontSize: 14}}>
              {item.route.start}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 15}}>To</Text>
            <Text
              style={{paddingLeft: '61%', fontFamily: FONT_REG, fontSize: 14}}>
              {item.route.end}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            backgroundColor: '#d1d1d1',
            padding: 10,
            adding: 10,
            borderRadius: 6,
          }}>
          <Text style={[styles.btnText, {paddingBottom: 10}]}>
            Goods to deliver
          </Text>
          <Image
            source={{uri: item.goodsPicture}}
            style={{width: 120, height: 120}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            //marginVertical: 10,
            backgroundColor: '#d1d1d1',
            padding: 10,
            borderRadius: 6,
          }}>
          <Text style={{fontFamily: FONT_BOLD, fontSize: 15}}>
            Delivery Fee
          </Text>
          <Text style={{fontFamily: FONT_BOLD, fontSize: 15}}>
            ${price.toFixed(2)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleFavourite(item.id)}
        style={styles.favBtn}>
        {item.isFavorite ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#fff'}}>Add to un-favorite</Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#fff', paddingHorizontal: 10}}>
              Add to Favorite
            </Text>
            <MaterialIcons name="favorite-outline" size={25} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  btnText: {
    fontFamily: FONT_BOLD,
    fontSize: 16,
    color: TEXT_COLOR,
  },
  AppBarcontainer: {
    height: 58,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    elevation: 26,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  favBtn: {
    backgroundColor: BTN_COLOR,
    height: 50,
    marginBottom: 10,
    marginHorizontal: 13,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
