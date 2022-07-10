import user from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';


import { UserList } from './user-list'

describe('userList', () => {
	test('it should open right panel', async () => {
        render(<UserList />);
        const buttonSecondUser = screen.getByTestId("user-1");
        expect(screen.getByLabelText(/first name/i).value).toBe('Tim');

        // Change the opened panel
        user.click(buttonSecondUser);
        await waitFor(() => {
            expect(screen.getByLabelText(/first name/i).value).toBe('Linus');
        });
	});

	test('it should change values in button on submit', async () => {
        render(<UserList />);
        expect(screen.getByLabelText(/first name/i).value).toBe('Tim');

        // Change the opened panel
        user.clear(screen.getByLabelText(/first name/i));
        user.type(screen.getByLabelText(/first name/i), 'Thomas');
        user.clear(screen.getByLabelText(/last name/i));
        user.type(screen.getByLabelText(/last name/i), 'Berger');
        user.clear(screen.getByLabelText(/login/i), );
        user.type(screen.getByLabelText(/login/i), 'thomasb');
        fireEvent.click(screen.getByRole('button', { name: /Update/i }))
        
        await waitFor(() => {
            expect(screen.getByTestId("user-0")).toHaveTextContent("Thomas Berger @thomasb")
        });
	});
})