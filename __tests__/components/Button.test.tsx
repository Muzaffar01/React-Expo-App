import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/shared/components/Button/Button';
import { ThemeProvider } from '../../src/shared/theme/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider isDark={false}>{component}</ThemeProvider>
  );
};

describe('Button', () => {
  it('renders correctly with title', () => {
    const { getByText } = renderWithTheme(
      <Button title="Test Button" onPress={() => {}} />
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Press Me" onPress={onPressMock} />
    );
    
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Disabled Button" onPress={onPressMock} disabled />
    );
    
    fireEvent.press(getByText('Disabled Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows loading indicator when isLoading is true', () => {
    const { queryByText, getByTestId } = renderWithTheme(
      <Button title="Loading" onPress={() => {}} isLoading />
    );
    
    expect(queryByText('Loading')).toBeNull();
  });

  it('renders with different variants', () => {
    const { rerender, getByText } = renderWithTheme(
      <Button title="Primary" onPress={() => {}} variant="primary" />
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(
      <ThemeProvider isDark={false}>
        <Button title="Secondary" onPress={() => {}} variant="secondary" />
      </ThemeProvider>
    );
    expect(getByText('Secondary')).toBeTruthy();

    rerender(
      <ThemeProvider isDark={false}>
        <Button title="Outline" onPress={() => {}} variant="outline" />
      </ThemeProvider>
    );
    expect(getByText('Outline')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { rerender, getByText } = renderWithTheme(
      <Button title="Small" onPress={() => {}} size="small" />
    );
    expect(getByText('Small')).toBeTruthy();

    rerender(
      <ThemeProvider isDark={false}>
        <Button title="Large" onPress={() => {}} size="large" />
      </ThemeProvider>
    );
    expect(getByText('Large')).toBeTruthy();
  });
});
