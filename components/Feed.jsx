
'use client';
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) =>
{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () =>
{
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () =>
  {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  }

  // Prompt search
  const [searchText, setSearchText] = useState('');
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (input) =>
  {
    clearTimeout(searchTimeOut);
    setSearchText(input.target.value);
    setSearchTimeOut(setTimeout(() =>
    {
      const filteredPrompt = filteredPosts(input.target.value);
      setSearchedResults(filteredPrompt);
    }, 1))
  };

  const filteredPosts = (text) =>
  {
    console.log("Searched text", text);
    const regex = new RegExp(text, 'i');
    return posts.filter((post) =>
      regex.test(post.prompt)
      || regex.test(post.tag)
      || regex.test(post.creator.username))
  };

  const handleTagClick = (tag) =>
  {
    clearTimeout(searchTimeOut);
    setSearchText(tag);
    setSearchTimeOut(setTimeout(() =>
    {
      const filteredPrompt = filteredPosts(tag);
      setSearchedResults(filteredPrompt);
    }, 1))
  }

  useEffect(() =>
  {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompts..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (<PromptCardList data={searchedResults} handleTagClick={handleTagClick} />)
        : (<PromptCardList data={posts} handleTagClick={handleTagClick} />)}
    </section>
  )
}

export default Feed