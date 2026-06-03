import React, { useState } from "react";
import { albumsData, songsData } from "../assets/assets";
import SongItem from "../components/SongItem";
import Navbar from "./Navbar";
import Albumitem from "./Albumitem";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(query.toLowerCase())
  );
    const filteredAlbums = albumsData.filter((album) =>
    album.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="p-4 text-white">
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded bg-[#242424] text-white outline-none"
      />

      <div className="flex flex-wrap gap-4 mt-6 grid grid-cols-4 ">
        {filteredSongs.map((song) => (
          <SongItem
            key={song.id}
            id={song.id}
            name={song.name}
            image={song.image}
          />
        ))}
        
      </div>
      <div className="flex flex-wrap gap-4 mt-6 grid grid-cols-4 ">
        {filteredAlbums.map((album) => (
          <Albumitem
            key={album.id}
            id={album.id}
            name={album.name}
            image={album.image}
          />
        ))}
        
      </div>
    </div>
    </>
  );
};

export default SearchBar;