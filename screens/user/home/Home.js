import React, { useEffect, useState } from 'react'
import Search from '../../../components/user/home/Search'
import ProductCard from '../../../components/user/home/ProductCards';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../../../constants/colors';
import { useEcommerceContext } from '../../../contexts/ContextProvider';
import SortingButton from '../../../components/user/home/SortingButton';

import { gql } from 'graphql-request';

const QUERY = gql`
query MyQuery {
  categories{
    id
    name
    collections {
      id
      name
      varieties {
        id
        name
        products {
          id
          name
          price
          description
          excerpt
        }
      }
    }
  }
}`;


export default function Home(props) {
    const { items } = useEcommerceContext();

    const [search, setSearch] = useState('');


    const [filteredDataSource, setFilteredDataSource] = useState(items);
    const [masterDataSource, setMasterDataSource] = useState(items);

    useEffect(() => {
        setFilteredDataSource(items);
        setMasterDataSource(items);
    }, [items]);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.map(function (item) {
                const arr = item.items.filter(i => {
                    const itemData = i.name
                        ? i.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                })
                return {
                    ...item,
                    items: arr,
                }

            });
            const searchedData = newData.filter(item => item.items.length > 0)
            setFilteredDataSource(searchedData);
            setSearch(text);

        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    return (
        <View style={styles.screen}>
            <Search search={search} searchFilterFunction={searchFilterFunction} />
            <View style={styles.sortingButton}>

                <SortingButton asc />
            </View>
            {
                filteredDataSource.length > 0 ? (
                    <ProductCard data={filteredDataSource} navigation={props.navigation} />
                ) : (
                    <View style={{ display: 'flex', height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Oops! No Match Results...</Text>
                    </View>
                )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    sortingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});
