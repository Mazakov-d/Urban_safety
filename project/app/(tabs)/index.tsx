import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Shield, CircleUser as UserCircle2, Chrome as Home, Search, CircleAlert as AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

// Web fallback component
function WebMapFallback() {
  return (
    <View style={styles.webFallback}>
      <Text style={styles.webFallbackText}>
        Map view is not available on web platform.
        Please use a mobile device to access the full map features.
      </Text>
    </View>
  );
}

// Only import MapView components when needed
let MapView, Marker;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
  } catch (e) {
    console.warn("Could not load react-native-maps:", e);
  }
}

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [nearbyHelpers, setNearbyHelpers] = useState([
    { id: 1, latitude: 37.78925, longitude: -122.4344, name: 'Sarah M.', rating: 4.9 },
    { id: 2, latitude: 37.78625, longitude: -122.4314, name: 'Robert J.', rating: 4.7 },
    { id: 3, latitude: 37.78725, longitude: -122.4354, name: 'Diane K.', rating: 4.8 }
  ]);
  
  const [safeLocations, setSafeLocations] = useState([
    { id: 1, latitude: 37.78525, longitude: -122.4344, name: 'Central Library', type: 'Public' },
    { id: 2, latitude: 37.78825, longitude: -122.4374, name: 'City Hospital', type: 'Medical' },
    { id: 3, latitude: 37.78725, longitude: -122.4284, name: 'Police Station', type: 'Emergency' }
  ]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        // Mock location for web
        setLocation({
          coords: {
            latitude: 37.78825,
            longitude: -122.4324,
          }
        });
        setMapRegion({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        });
        return;
      }
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        });
      } catch (error) {
        setErrorMsg('Could not fetch location');
      }
    })();
  }, []);

  // Conditionally render map or web fallback
  const MapViewComponent = () => {
    if (Platform.OS === 'web' || !MapView) {
      return <WebMapFallback />;
    }

    try {
      return (
        <MapView
          style={styles.map}
          region={mapRegion}
          provider={Platform.OS === 'android' ? (MapView.PROVIDER_GOOGLE || 'google') : undefined}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {nearbyHelpers.map(helper => (
            <Marker
              key={`helper-${helper.id}`}
              coordinate={{
                latitude: helper.latitude,
                longitude: helper.longitude
              }}
            >
              <View style={styles.helperMarker}>
                <UserCircle2 size={24} color="#3B82F6" />
              </View>
            </Marker>
          ))}
          
          {safeLocations.map(location => (
            <Marker
              key={`location-${location.id}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
            >
              <View style={styles.safeLocationMarker}>
                <Home size={24} color="#10B981" />
              </View>
            </Marker>
          ))}
        </MapView>
      );
    } catch (error) {
      console.warn("Error rendering map:", error);
      return <WebMapFallback />;
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <AlertCircle size={24} color="#EF4444" />
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : null}
      
      <MapViewComponent />
      
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <Text style={styles.searchText}>Search for safe locations</Text>
        </TouchableOpacity>
      </View>
      
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
        style={styles.nearbyGradient}
      >
        <View style={styles.nearbyContainer}>
          <Text style={styles.nearbyTitle}>Nearby Safe Network</Text>
          
          <ScrollableSection title="Verified Helpers" data={nearbyHelpers} renderItem={(item) => (
            <TouchableOpacity style={styles.helperCard} key={item.id}>
              <View style={styles.helperIconContainer}>
                <Shield size={24} color="#3B82F6" />
              </View>
              <View style={styles.helperInfo}>
                <Text style={styles.helperName}>{item.name}</Text>
                <Text style={styles.helperRating}>Rating: {item.rating}</Text>
              </View>
            </TouchableOpacity>
          )} />
          
          <ScrollableSection title="Safe Locations" data={safeLocations} renderItem={(item) => (
            <TouchableOpacity style={styles.locationCard} key={item.id}>
              <View style={styles.locationIconContainer}>
                <Home size={24} color="#10B981" />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationType}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          )} />
        </View>
      </LinearGradient>
    </View>
  );
}

function ScrollableSection({ title, data, renderItem }) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map(item => renderItem(item))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  webFallbackText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4b5563',
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 5,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  nearbyGradient: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    height: 280,
    zIndex: 5,
    paddingTop: 40,
  },
  nearbyContainer: {
    padding: 16,
  },
  nearbyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4B5563',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  scrollContent: {
    paddingRight: 16,
  },
  helperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    minWidth: 180,
  },
  helperIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helperInfo: {
    flex: 1,
  },
  helperName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  helperRating: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    minWidth: 180,
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  locationType: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  helperMarker: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  safeLocationMarker: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
    borderWidth: 2,
    borderColor: '#10B981',
  },
});