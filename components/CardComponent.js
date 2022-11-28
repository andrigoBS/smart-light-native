import { StyleSheet, View} from 'react-native';

const CardComponent = ({children}) => {
    return (
        <View style={styles.card} >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
  card:{
      backgroundColor: '#ffffff',
      width: '95%',
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      borderWidth: 2,
      borderColor: '#ecebeb',
      borderRadius: 5,
      padding: 15
  }
});
export default CardComponent;