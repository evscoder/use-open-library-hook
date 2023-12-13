import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
test('should main title test hello', () => {
    const { getByTestId } = render(
        <App />
    );

    const title = getByTestId('main-title');
    expect(title.textContent).toBe('Hello');
});
