import './App.css';
import useOpenLibrary from "./hooks/useOpenLibrary";
function App() {
    const { books, isLoading } = useOpenLibrary('test');

    return (
        <h1 data-testid={'main-title'}>{isLoading ? JSON.stringify(books) : 'Hello' }</h1>
    );
}

export default App;
