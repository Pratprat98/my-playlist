import React, { useState } from "react";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    if (e.target.name === "title") setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    if (e.target.name === "content") setContent(e.target.value);
  };

  const addNotes = () => {
    setNotes([...notes, { title, content }]);
    setTitle("");
    setContent("");
  };

  const deleteNotes = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <>
      <header>
        <h1>Playlist Creator</h1>
        <input type="text" id="searchInput" placeholder="Search for a song" />
      </header>
      <main>
        <div id="searchResults" class="result-div"></div>
        <div id="playlist" class="result-div">
          <h2>Your Playlist</h2>
          <ul id="playlistItems"></ul>
        </div>
      </main>
    </>
  );
};

export default Index;
