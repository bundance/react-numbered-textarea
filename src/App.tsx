import { useState } from 'react';
import NumberedTextArea from './components/NumberedTextArea';
import './App.css';

function App() {
  const [content, setContent] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="App">
      <div className="card">
        <NumberedTextArea
          value={content}
          onChange={handleChange}
          name="textarea"
        />
      </div>
    </div>
  );
}

export default App;
