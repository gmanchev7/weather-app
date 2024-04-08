/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from './index';
import '@testing-library/jest-dom'

describe('SearchInput component', () => {
    test('renders input field and search button', () => {
        render(<SearchInput fetchData={() => { }} />);
        expect(screen.getByPlaceholderText(/search city or postcode/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('updates input field value as user types', () => {
        render(<SearchInput fetchData={() => { }} />);
        const inputField = screen.getByPlaceholderText(/search city or postcode/i);
        fireEvent.change(inputField, { target: { value: 'London' } });
        expect(inputField.value).toBe('London');
    });

    test('calls fetchData function with input value when search button is clicked', () => {
        const fetchDataMock = jest.fn();
        render(<SearchInput fetchData={fetchDataMock} />);
        const inputField = screen.getByPlaceholderText(/search city or postcode/i);
        fireEvent.change(inputField, { target: { value: 'London' } });
        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);
        expect(fetchDataMock).toHaveBeenCalledWith('London');
    });

    test('calls fetchData function with input value when Enter key is pressed', () => {
        const fetchDataMock = jest.fn();
        render(<SearchInput fetchData={fetchDataMock} />);
        const inputField = screen.getByPlaceholderText(/search city or postcode/i);
        fireEvent.change(inputField, { target: { value: 'London' } });
        fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' });
        expect(fetchDataMock).toHaveBeenCalledWith('London');
    });
});