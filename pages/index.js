import React, { useState } from "react";

const Index = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);

  const handleAddSong = (e) => {
    e.preventDefault();
    const songName = e.target.songName.value;
    if (songName) {
      setPlaylistSongs([...playlistSongs, songName]);
      e.target.songName.value = "";
    }
  };

  const savePlaylist = () => {
    if (playlistName && playlistSongs.length > 0) {
      setSavedPlaylists([...savedPlaylists, { name: playlistName, songs: playlistSongs }]);
      setPlaylistName("");
      setPlaylistSongs([]);
    }
  };

  const deletePlaylist = (index) => {
    const updatedPlaylists = savedPlaylists.filter((_, i) => i !== index);
    setSavedPlaylists(updatedPlaylists);
  };

  return (
    <>
      <header>
        <h1>Playlist Creator</h1>
        <button onClick={() => setPlaylistName(prompt("Enter playlist name"))}>
          Create Playlist
        </button>
      </header>
      <main>
        <div className="result-div">
          <h2>Your Playlist</h2>
          <h3>{playlistName}</h3>
          <form onSubmit={handleAddSong}>
            <input type="text" name="songName" placeholder="Enter song name" />
            <button type="submit">Add Song</button>
          </form>
          <ul>
            {playlistSongs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
          <button onClick={savePlaylist}>Save Playlist</button>
        </div>
        <div className="result-div">
          <h2>Saved Playlists</h2>
          <ul>
            {savedPlaylists.map((playlist, index) => (
              <li key={index}>
                <span
                  onClick={() => {
                    savedPlaylists[index].expanded = !savedPlaylists[index].expanded;
                    setSavedPlaylists([...savedPlaylists]);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {playlist.name}
                </span>
                <button onClick={() => deletePlaylist(index)}>Delete Playlist</button>
                {playlist.expanded && (
                  <ul>
                    {playlist.songs.map((song, songIndex) => (
                      <li key={songIndex}>{song}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Index;
