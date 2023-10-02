import React from 'React';
//import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

// import App from '../client/App';
import Login from '../client/components/Login';
import Signup from '../client/components/Signup';
import NewBill from '../client/components/NewBill';
import UtilityCard from '../client/components/UtilityCard';
// import store from '../client/store';

const justClicked = jest.fn();

describe('Unit Tests', () => {
    describe('Signup' , () => {

        test('Four input fields for username, password, security question, and answer', () => {
            const signup = render(<Signup/>);
            expect(signup.getByRole('input', {name: 'username'})).toBeInTheDocument();
            expect(signup.getByRole('input', {name: 'password'})).toBeInTheDocument();
            expect(signup.getByRole('input', {name: 'security question'})).toBeInTheDocument();
            expect(signup.getByRole('input', {name: 'answer'})).toBeInTheDocument();
        })
        test('one button for signup', () => {
            const user = render(<Signup/>);
            expect(user.getByRole('button', {name: 'Sign up'})).toBeInTheDocument();

        })
        test('user info passed should be invoked on click', async () => {
            const props = {signup: jest.fn()};
            render(<Signup {...props}/>);
            const buttons = await screen.findAllByRole('button');
            userEvent.click(screen.getByText('Sign up'));
            expect(props.signup).toHaveBeenCalled();
        })
    })

    describe('Login', () => {
      let login;
      const props = {
        login: justClicked,
        signup: justClicked,
        forgotPassword: justClicked
      }

      test('Contains two labels and two input fields for the username and the password', () => {
        login = render(<Login />);
        expect(login.getByText('Username:')).toBeInTheDocument();
        expect(login.getByRole('input', { name: 'username' })).toBeInTheDocument();
        expect(login.getByText('Password:')).toBeInTheDocument();
        expect(login.getByRole('input', { name: 'password' })).toBeInTheDocument();
      })

      test('Contains three buttons labeled Login, Signup and Forgot password', () => {
        login = render(<Login />);
        expect(login.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(login.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
        expect(login.getByRole('button', { name: 'Forgot password' })).toBeInTheDocument();
      })

      test('Creates a new session when clicking on the login button', () => {
        login = render(<Login {...props} />);
        const loginButton = login.getByRole('button', { name: 'login' });
        userEvent.click(loginButton);
        expect(justClicked).toHaveBeenCalled();
      })

      test('Displays the signup component when clicking on the signup button', () => {
        login = render(<Login {...props} />);
        const signupButton = login.getByRole('button', { name: 'signup' });
        userEvent.click(signupButton);
        expect(justClicked).toHaveBeenCalled();
      })

      test('Displays the forgot password component when clicking on the forgot password button', () => {
        login = render(<Login {...props} />);
        const forgotPasswordButton = login.getByRole('button', { name: 'Forgot Password' });
        userEvent.click(forgotPasswordButton);
        expect(justClicked).toHaveBeenCalled();
      })
    })

    describe('Utility Information Component Card', () => {
        test('Utility card displays type, date and amount.', () => {
            const utilityCard = render(<UtilityCard {...props}/>);
            expect(utilityCard.getByText('Type:')).toBeInTheDocument();
            expect(utilityCard.getByText('Date:')).toBeInTheDocument();
            expect(utilityCard.getByText('Amount:')).toBeInTheDocument();
        });

        test('One button to delete card.', () => {
            const deleteButton = render(<UtilityCard/>);
            expect(deleteButton.getByRole('button', {name: 'Delete'})).toBeInTheDocument();
        });

        test('Delete one utility card upon one click', async () => {
            const props = {Delete : jest.fn()};
            render(<UtilityCard {...props}/>);
            const buttons = await screen.findAllByRole('button'); //check if it works
            userEvent.click(screen.getByText('Delete'));
            expect(props.Delete).toHaveBeenCalled();
        });

        test('Three update buttons to update type, date and amount.', () => {

        });
        test('Type update button to update type on click', () => {

        });
        test('Date update button to update type on click', () => {

        });
        test('Amount update button to update type on click', () => {

        });
    })

    describe('New Utility Input Box', () => {
        test('one button for submit', () => {
            const bill = render(<NewBill/>);
            expect(bill.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
        });
        test('submit utility info upon one click', async () => {
            const props = {Submit : jest.fn()};
            render(<NewBill {...props}/>);
            const buttons = await screen.findAllByRole('button'); //is it correct
            userEvent.click(screen.getByText('Submit'));
            expect(props.signup).toHaveBeenCalled();
        });
        test('3 input fields fo utility type, date, amount', () => {
            const newBill = render(<NewBill/>);
            expect(signup.getByRole('input', {name: 'Utility type'})).toBeInTheDocument();
            expect(signup.getByRole('input', {name: 'Date'})).toBeInTheDocument();
            expect(signup.getByRole('input', {name: 'Bill Amount'})).toBeInTheDocument();
        })
    })
    describe('totals display', () => {

    })
});

describe('End-to-End tests')
