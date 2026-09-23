import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('splits the remaining budget using unrounded income shares', () => {
  const { container } = render(<App />);
  const enter = (name, value) =>
    fireEvent.change(container.querySelector(`[name="${name}"]`), { target: { value } });

  enter('spouse1Name', 'Alex');
  enter('spouse2Name', 'Sam');
  enter('income1', '5140');
  enter('income2', '4860');
  enter('rent', '3000');
  enter('otherBills', '1500');
  enter('savingsGoal', '500');
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText(/Alex's Account Despost:/)).toHaveTextContent('2570.00');
  expect(screen.getByText(/Sam's Account Despost:/)).toHaveTextContent('2430.00');
});
