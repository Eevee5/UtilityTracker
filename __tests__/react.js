import React from 'react';
//import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import regeneratorRuntime from 'regenerator-runtime';

// import App from '../client/App';
// import Login from '../client/components/Login';
// import Signup from '../client/components/Signup';
import ForgotPassword from '../client/components/ForgotPassword';
// import NewBill from '../client/components/NewBill';
// import Dashboard from '../client/components/Dashboard';
// import UtilityCard from '../client/components/UtilityCard';

const justClicked = jest.fn();

describe('Unit Tests', () => {
  describe('Signup', () => {
    test('Four input fields for username, password, security question, and answer', () => {
      const signup = render(<Signup />);
      expect(
        signup.getByRole('input', { name: 'username' })
      ).toBeInTheDocument();
      expect(
        signup.getByRole('input', { name: 'password' })
      ).toBeInTheDocument();
      expect(
        signup.getByRole('input', { name: 'securityQuestion' })
      ).toBeInTheDocument();
      expect(signup.getByRole('input', { name: 'securityAnswer' })).toBeInTheDocument();
    });

    test('one button for signup', () => {
      const user = render(<Signup />);
      expect(user.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    });

    test('user info passed should be invoked on click', async () => {
      const props = { signup: jest.fn() };
      const { getByRole } = render(<Signup {...props} />);
      const signupButton = await screen.getByRole('button',{name: 'Sign up'});
      userEvent.click(signupButton);
      expect(props.signup).toHaveBeenCalled();
    });
  });

  xdescribe('Login', () => {
    let login;
    const props = {
      login: justClicked,
      signup: justClicked,
      forgotPassword: justClicked,
    };

    test('Contains two labels and two input fields for the username and the password', () => {
      login = render(<Login />);
      expect(login.getByText('Username:')).toBeInTheDocument();
      expect(
        login.getByRole('input', { name: 'username' })
      ).toBeInTheDocument();
      expect(login.getByText('Password:')).toBeInTheDocument();
      expect(
        login.getByRole('input', { name: 'password' })
      ).toBeInTheDocument();
    });

    test('Contains three buttons labeled Login, Signup and Forgot password', () => {
      login = render(<Login />);
      expect(login.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      expect(login.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
      expect(
        login.getByRole('button', { name: 'Forgot password' })
      ).toBeInTheDocument();
    });

    test('Invokes three functions on click', () => {
      login = render(<Login {...props} />);
      const loginButton = login.getByRole('button', { name: 'login' });
      const signupButton = login.getByRole('button', { name: 'signup' });
      const forgotPasswordButton = login.getByRole('button', {
        name: 'Forgot Password',
      });
      userEvent.click(loginButton);
      userEvent.click(signupButton);
      userEvent.click(forgotPasswordButton);
      expect(justClicked).toHaveBeenCalledTimes(3);
    });
  });

  xdescribe('Forgot Password', () => {
    let forgotPassword;
    const props = {
      verify: justClicked,
    };

    test('Contains four labels and four input fields for the username, email, secret question/answer and new password', () => {
      forgotPassword = render(<ForgotPassword />);
      expect(forgotPassword.getByText('Username:')).toBeInTheDocument();
      expect(
        forgotPassword.getByRole('input', { name: 'username' })
      ).toBeInTheDocument();
      expect(forgotPassword.getByText('Email:')).toBeInTheDocument();
      expect(
        forgotPassword.getByRole('input', { name: 'email' })
      ).toBeInTheDocument();
      expect(forgotPassword.getByText('Secret question:')).toBeInTheDocument(); // Do we want to display a 'Secret Question' label or the actual secret question?
      expect(
        forgotPassword.getByRole('input', { name: 'secret-answer' })
      ).toBeInTheDocument();
      expect(forgotPassword.getByText('New password:')).toBeInTheDocument();
      expect(
        forgotPassword.getByRole('input', { name: 'password' })
      ).toBeInTheDocument();
    });

    test('Contains a button labeled Verify', () => {
      forgotPassword = render(<ForgotPassword />);
      expect(
        forgotPassword.getByRole('button', { name: 'Verify' })
      ).toBeInTheDocument();
    });

    test('Invokes a function on click', () => {
      forgotPassword = render(<ForgotPassword />);
      const verifyButton = forgotPassword.getByRole('button', {
        name: 'Verify',
      });
      userEvent.click(verifyButton);
      expect(justClicked).toHaveBeenCalled();
    });
  });

  xdescribe('Utility Information Component Card', () => {
    // let utilityCard = render(<UtilityCard {...props} />);
    test('Utility card displays type, date and amount.', () => {
      const utilityCard = render(<UtilityCard />);
      expect(utilityCard.getByText('Type:')).toBeInTheDocument();
      expect(utilityCard.getByText('Date:')).toBeInTheDocument();
      expect(utilityCard.getByText('Amount:')).toBeInTheDocument();
    });

    test('One button to delete card.', () => {
      const deleteButton = render(<UtilityCard />);
      expect(
        deleteButton.getByRole('button', { name: 'Delete' })
      ).toBeInTheDocument();
    });

    test('Delete one utility card upon one click', async () => {
      const props = { Delete: jest.fn() };
      render(<UtilityCard {...props} />);
      const deleteButton = await screen.findAllByRole('button');
      userEvent.click(deleteButton);
      expect(props.Delete).toHaveBeenCalled();
    });

    test('Three update buttons to update type, date and amount on click.', () => {
      const props = {
        updateType: jest.fn(),
        updateDate: jest.fn(),
        updateAmount: jest.fn(),
      };
      const { getByRole } = render(<UtilityCard updateType={updateType} />);
      const updateDateButton = getByRole('button', { name: 'Update Type' });
      const updateTypeButton = getByRole('button', { name: 'Update Date' });
      const updateAmountButton = getByRole('button', { name: 'Update Amount' });
      userEvent.click(updateTypeButton);
      userEvent.click(updateDateButton);
      userEvent.click(updateAmountButton);
      expect(updateType).toHaveBeenCalled();
      expect(updateDate).toHaveBeenCalled();
      expect(updateAmount).toHaveBeenCalled();
    });

    test('Type update button to update type on click', () => {
      expect(utilityCard.getByTestId('updateTypeButton')).toBeInTheDocument();
      expect(utilityCard.getByTestId('updateDateButton')).toBeInTheDocument();
      expect(utilityCard.getByTestId('updateAmountButton')).toBeInTheDocument();
    });
  });

      test('Contains three buttons labeled Login, Signup and Forgot password', () => {
        login = render(<Login />);
        expect(login.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(login.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
        expect(login.getByRole('button', { name: 'Forgot password' })).toBeInTheDocument();
      })

      test('Invokes three functions on click', () => {
        login = render(<Login {...props} />);
        const loginButton = login.getByRole('button', { name: 'login' });
        const signupButton = login.getByRole('button', { name: 'signup' });
        const forgotPasswordButton = login.getByRole('button', { name: 'Forgot Password' });
        userEvent.click(loginButton);
        userEvent.click(signupButton);
        userEvent.click(forgotPasswordButton);
        expect(justClicked).toHaveBeenCalledTimes(3);
      })
    })

    describe('Forgot Password', () => {
      let forgotPassword;

      test('Contains three input fields for the username, secret answer and new password', () => {
        forgotPassword = render(<ForgotPassword />);
        expect(forgotPassword.getByTestId('username')).toBeInTheDocument();
        expect(forgotPassword.getByTestId('secret-answer')).toBeInTheDocument();
        expect(forgotPassword.getByTestId('password')).toBeInTheDocument();
      })

      test('Contains a button labeled Verify', () => {
        forgotPassword = render(<ForgotPassword />);
        expect(forgotPassword.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
      })

      test('Invokes a function on click', async () => {
        forgotPassword = render(<ForgotPassword />);
        const verifyButton = forgotPassword.getByRole('button', { name: 'Verify' });
        verifyButton.addEventListener('click', justClicked);
        expect(justClicked).toHaveBeenCalled();
      })
    })

    xdescribe('Utility Information Component Card', () => {
        // let utilityCard = render(<UtilityCard {...props} />);
        test('Utility card displays type, date and amount.', () => {
            const utilityCard = render(<UtilityCard/>);
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
            const deleteButton = await screen.findAllByRole('button');
            userEvent.click(deleteButton);
            expect(props.Delete).toHaveBeenCalled();
        });

        test('Three update buttons to update type, date and amount on click.', () => {
            const props = {
            updateType: jest.fn(),
            updateDate: jest.fn(),
            updateAmount: jest.fn()
          }
          const { getByRole } = render(<UtilityCard updateType={updateType} /> );
          const updateDateButton = getByRole('button', { name: 'Update Type' });
          const updateTypeButton = getByRole('button', { name: 'Update Date' });
          const updateAmountButton = getByRole('button', { name: 'Update Amount' });
          userEvent.click(updateTypeButton);
          userEvent.click(updateDateButton);
          userEvent.click(updateAmountButton);
          expect(updateType).toHaveBeenCalled();
          expect(updateDate).toHaveBeenCalled();
          expect(updateAmount).toHaveBeenCalled();
        });

        test('Type update button to update type on click', () => {


          expect(utilityCard.getByTestId('updateTypeButton')).toBeInTheDocument();
          expect(utilityCard.getByTestId('updateDateButton')).toBeInTheDocument();
          expect(utilityCard.getByTestId('updateAmountButton')).toBeInTheDocument();
        });
    })

    xdescribe('New Utility Input Box', () => {
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
            expect(newBill.getByRole('input', {name: 'Utility type'})).toBeInTheDocument();
            expect(newBill.getByRole('input', {name: 'Date'})).toBeInTheDocument();
            expect(newBill.getByRole('input', {name: 'Bill Amount'})).toBeInTheDocument();
        })
    })
    xdescribe('totals display', () => {
      test('Display total amount of utility bills', () => {
      const totalsDisplay = render(<Dashboard />);
      expect(totalsDisplay.getByText('Total:')).toBeInTheDocument();
    });
    test('Test total amount from props', () => {
      const props = {
        utilityBills: [100, 200, 300],
      };
      const total = render(<Dashboard />);
      expect(total.getByText('Total: $600')).toBeInTheDocument();
    });
    // test('Total amount update when new utility bill is added', () => {
    // const props = {
    // utilityBills: [100,200],
    // }
    // const total = render(<Dashboard {...props}/>);
    // //total before adding new utility bill
    // expect(total.getByText('Total: $300')).toBeInTheDocument();
    // //adding new utility bill
    // const utilityType = getByRole('input', { name: 'Utility type'});
    // const date = getByRole('input', {name: 'Date'});
    // const amount = getByRole('input', {name: 'Bill Amount'});
    // const submitButton = getByRole('button', {name: 'Submit'});
    // userEvent.type(utilityType, 'Electricity');
    // userEvent.type(date, '10/3/23');
    // userEvent.type(amount, '300');
    // userEvent.click(submitButton);
    // //check if total updated based off new utility bill input
    // expect(total.getByText('Total: $600')).toBeInTheDocument();
    // })
    // test('Total amount update when a utility bill is deleted', () => {
    // const props = {
    // utilityBills: [100,200,300],
    //         }
    // const total = render(<Dashboard {...props}/>);
    // //total before adding new utility bill
    // expect(total.getByText('Total: $600')).toBeInTheDocument();
    // //totalafter deleting a utility bill
    // const deleteButton = getByRole('button', {name: 'Delete'});
    // userEvent.click(deletebutton);
    // //check if total updated upon deleting one utility bill
    // expect(tota.getByText('Total: $300')).toBeInTheDocument();
    // })
  });

// describe('End-to-End tests');
