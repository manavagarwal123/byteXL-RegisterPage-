import { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const addBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;
    setBooks([...books, { title: newTitle, author: newAuthor }]);
    setNewTitle("");
    setNewAuthor("");
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div className="library-container">
      <h1 className="title">📚 Library Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Book List */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <div>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeBook(index)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="no-books">No books found.</p>
        )}
      </div>

      {/* Add Book Form */}
      <form className="add-form" onSubmit={addBook}>
        <h2>Add a New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default App;