import React, { useEffect, useState } from "react";
const Index = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [songInfo, setSongInfo] = useState([]);
  const [title, setTitle] = useState("");

  const savePlaylist = () => {
    if (playlistName && playlistSongs.length > 0) {
      setSavedPlaylists([
        ...savedPlaylists,
        { name: playlistName, songs: playlistSongs },
      ]);
      setPlaylistName("");
      setPlaylistSongs([]);
      alert("Playlist saved!");
    } else if (!playlistName) {
      alert("Please enter a playlist name");
    } else if (playlistSongs.length === 0) {
      alert("Please add songs to your playlist");
    }
  };

  const deletePlaylist = (index) => {
    const updatedPlaylists = savedPlaylists.filter((_, i) => i !== index);
    setSavedPlaylists(updatedPlaylists);
  };

  const getSongInfo = async () => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${title}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "52cfdad046msh962b4c10ee7d242p14f426jsn14eefeee963a",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.data.length === 0) {
        alert("No songs found");
        return;
      }
      setSongInfo(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToPlaylist = (songName, artistName) => {
    return (e) => {
      e.preventDefault();
      const song = `${songName} - ${artistName}`;
      setPlaylistSongs([...playlistSongs, song]);
    };
  };

  useEffect(() => {
    const savedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists"));
    if (savedPlaylists) {
      setSavedPlaylists(savedPlaylists);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Create Your Playlist</h1>
      </header>

      <div className="playlist-control">
        <div className="saved-playlists-section">
          <h2>Saved Playlists</h2>
          <ul className="saved-playlists-list">
            {savedPlaylists.map((playlist, index) => (
              <li key={index} className="saved-playlist">
                <span
                  onClick={() => {
                    savedPlaylists[index].expanded =
                      !savedPlaylists[index].expanded;
                    setSavedPlaylists([...savedPlaylists]);
                  }}
                  className="playlist-name"
                >
                  {playlist.name}
                </span>
                <button
                  className="delete-button"
                  onClick={() => deletePlaylist(index)}
                >
                  Delete Playlist
                </button>
                {playlist.expanded && (
                  <ul className="playlist-songs-list">
                    {playlist.songs.map((song, songIndex) => (
                      <li key={songIndex} className="playlist-song">
                        {song}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="gap">
        </div>
        <button
            onClick={() => setPlaylistName(prompt("Enter playlist name"))}
          >
            {playlistName || "Enter Playlist Name"}
          </button>

        <ul className="playlist-songs-list">
          {playlistSongs.map((song, index) => (
            <li key={index} className="playlist-song">
              {song}
            </li>
          ))}
        </ul>
        <button onClick={savePlaylist}>
          Save Playlist
        </button>
      </div>
      <div className="gap">
        </div>
      <div className="search-section">
        <div className="search-bar">
          <h2>Search for a Song</h2>
          <div className="gap">
        </div>
          <div className="search-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getSongInfo();
              }}
            >
              <input
                type="text"
                name="title"
                // Make this appear centered placeholder="Enter song title"
                placeholder="Enter song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
        <div className="gap">
        </div>
        <h2>Song Information</h2>
        <div className="song-grid">
          {songInfo.map((song, index) => (
            <div className="song-card" key={index}>
              <img src={song.album.cover_medium} alt="album cover" />
              <p>
                <button
                  className="add-to-playlist-button"
                  onClick={addToPlaylist(song.title, song.artist.name)}
                >
                  {song.title}
                </button>
              </p>
              <p>Duration: {song.duration} seconds</p>
              <p>Album: {song.album.title}</p>
              <p>Artist: {song.artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
