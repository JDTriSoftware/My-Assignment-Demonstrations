//"StAuth10244: I Justin Triantafilou, 000775460 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
import { Image, StyleSheet, Platform, Button, TextInput, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ArtTable from '@/components/ArtTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArtForm from '@/components/ArtForm';

export default function HomeScreen() {
  const [artData, setArtData] = useState<any[]>([]);
  const [artId, setArtId] = useState('');
  const [formSubmissions, setFormSubmissions] = useState<any[]>([]);

  async function fetchArtData() {
    try {
      const artCollection = await axios.get('http://localhost:3001/api');
      console.log(artCollection.data);
      setArtData(artCollection.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function postArtData(art: any) {
    try {
      await axios.post('http://localhost:3001/api', art);
      setFormSubmissions(prev => prev.concat(art));
      fetchArtData();
    } catch (error) {
      console.error(error);
    }
  }


  async function putSubmittedArData() {
    try {
      await axios.put('http://localhost:3001/api/', formSubmissions);
      fetchArtData();
      setFormSubmissions([]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }



  async function deleteArtData() {
    try {
      const delCollection = await axios.delete('http://localhost:3001/api');
      fetchArtData();
    } catch (error) {
      console.error(error);
    }
  }


  async function fetchArtItem(id: any) {
    {
      try {
        const single_art = await axios.get(`http://localhost:3001/api/${id}`);
        console.log(single_art);
        setArtData([single_art.data]);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function deletArtItem(id: any) {
    {
      try {
        const del_single_art = await axios.delete(`http://localhost:3001/api/${id}`);
        console.log(del_single_art);
        fetchArtData();
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchArtData()
  }, []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView>
        <h1>Musuem Art Collection</h1>
        <ArtTable artData={artData} />
        <TextInput
          style={styles.textInput}
          placeholder="Art Id You Wish To See.."
          value={artId}
          onChangeText={setArtId}
        />
        <Button 
          title={`Fetch Art Item: ${artId}`}
          onPress={() => fetchArtItem(artId)}
        />
                <br />
        <Button
          title={`Delete Art Item: ${artId}`}
          onPress={() => deletArtItem(artId)}
        />
                <br />
        <Button
          title={'Fetch All Art'}
          onPress={() => fetchArtData()}
        />
                <br />
        <Button
          title={'Delete All Art'}
          onPress={() => deleteArtData()}
        />
        <br />
        <Button
          title={'PUT Your Art'}
          onPress={() => putSubmittedArData()}
        />
        <View style={styles.container}>
          <ArtForm style={styles.artForm} onSubmit={postArtData} />
        </View>

        {Object.values(formSubmissions).map(submission => (
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>{submission.item}</td>
            <td style={styles.tableCell}>{submission.location}</td>
            <td style={styles.tableCell}>{submission.worth}</td>
            <td style={styles.tableCell}>{submission.on_loan ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textInput: {
    width: '75%',
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#111213',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artForm: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  tableRow: {
    marginTop: 12,
    backgroundColor: '#1D3D47',
    height: 40,
    textAlign: 'center',
  },
  tableCell: {
    padding: 8,
    fontSize: 14,
  }
});
