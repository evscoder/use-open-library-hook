import {renderHook, waitFor} from "@testing-library/react";
import fetchIsOpenLibrary from "../api/fetchIsOpenLibrary";
import useOpenLibrary from "./useOpenLibrary";
import {act} from "react-dom/test-utils";

jest.mock('../api/fetchIsOpenLibrary');

const mockFetchIsOpenLibrary = jest.mocked(fetchIsOpenLibrary);

beforeEach(() => {
    mockFetchIsOpenLibrary.mockClear();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

it('should return initial state', () => {
    const { result } = renderHook(() => useOpenLibrary(''));

    expect(result.current.books).toEqual([]);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
});

it('should fetch books and state update on query change', async () => {
    const books = [
        { key: 'key1', title: 'Title 1', author_name: ['Author name 1'], first_publish_year: 1},
        { key: 'key2', title: 'Title 2', author_name: ['Author name 2'], first_publish_year: 1}
    ];

    mockFetchIsOpenLibrary.mockResolvedValue(books);

    const { result } = renderHook(() => useOpenLibrary('test'));

    act(() => {
        jest.advanceTimersByTime(500);
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(fetchIsOpenLibrary).toHaveBeenCalledTimes(1);
    expect(fetchIsOpenLibrary).toHaveBeenCalledWith('test');
    expect(result.current.books).toEqual(books);
    expect(result.current.isError).toBeFalsy();
});

it('should handle fetch errors', async () => {
    mockFetchIsOpenLibrary.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useOpenLibrary('test'));

    act(() => {
        jest.advanceTimersByTime(500);
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(fetchIsOpenLibrary).toHaveBeenCalledTimes(1);
    expect(fetchIsOpenLibrary).toHaveBeenCalledWith('test');
    expect(result.current.books).toEqual([]);
    expect(result.current.isError).toBeTruthy();
});
