import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image, Avatar} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useDeliveryStore from '../store/useDeliveryStore';
import {
  FONT_BOLD,
  FONT_REG,
  PRIMARY_COLOR,
  TEXT_COLOR,
  BACKGROUND,
  BTN_COLOR,
} from '../constants';

function ListItem({item, navigation}) {
  const price =
    Number(item.deliveryFee.replace(/[^0-9\.-]+/g, '')) +
    Number(item.surcharge.replace(/[^0-9\.-]+/g, ''));
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {item: item})}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 3,
        paddingRight: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <Avatar source={{uri: item.goodsPicture}} size="large" /> */}
        <Image
          source={{uri: item.goodsPicture}}
          style={{width: 75, height: 75}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={{paddingLeft: 3}}>
          <Text style={{fontFamily: FONT_REG}}>From : {item.route.start}</Text>
          <Text style={{fontFamily: FONT_REG}}>To : {item.route.end}</Text>
        </View>
      </View>
      <View>
        {item.isFavorite ? (
          <MaterialIcons name="favorite" color="red" size={26} />
        ) : null}
        <Text style={{fontFamily: FONT_BOLD, fontSize: 15}}>
          ${price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function List(props) {
  const navigation = useNavigation();
  const {data, getDeliveries, isLoading, isError, loadMoreDeliveries} =
    useDeliveryStore();
  const [isRefreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    getAllDeliveries();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await getDeliveries();
  }
  async function getAllDeliveries() {
    await getDeliveries();
  }

  async function handleMoreDeliveries() {
    await loadMoreDeliveries();
  }

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleMoreDeliveries}
          style={styles.loadMoreBtn}>
          <Text style={[styles.btnText, {color: '#fff'}]}>Load More</Text>
          {isLoading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating color="red" size={50} />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
          }}
          onPress={() => getAllDeliveries()}>
          <Text style={styles.btnText}>Error while loading deliveries.</Text>
          <Text
            style={[
              styles.btnText,
              {
                color: 'red',
              },
            ]}>
            Please reload page.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <View style={styles.AppBarcontainer}>
        <Text style={styles.btnText}>My Deliveries</Text>
      </View>
      <View style={{flex: 1}}>
        {data && (
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ListItem item={item} navigation={navigation} />
            )}
            keyExtractor={i => i.id + Math.random()}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 26,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
