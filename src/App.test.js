import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

// describe("App", () => {
//   it("renders App component", () => {
//     render(<App/>);
//     expect(screen.getByText(/SearchPage:/i)).toBeInTheDocument();
//     expect( screen.getByRole('textbox')).toBeInTheDocument();
//     expect( screen.getByLabelText(/search/i)).toBeInTheDocument();
//     expect( screen.getByPlaceholderText('search text ...')).toBeInTheDocument();
//     expect( screen.getByAltText('search img')).toBeInTheDocument();
//     expect( screen.getByDisplayValue("")).toBeInTheDocument();
//   });
// });

// 4

// describe("App", () => {
//   test("renders App component", async () => {
//     render(<App/>);
//     expect(screen.queryByText(/logged in as/i)).toBeNull();
//     screen.debug();
//     expect(await screen.findByText(/logged in as/i)).toBeInTheDocument();
//     screen.debug()
//
//     expect(screen.getByAltText(/search img/i)).toHaveClass('image');
//     expect(screen.getByLabelText(/search/i)).toBeRequired();
//   });
// });

// 5  fireEvent

// describe('App', () => {
//   test('renders App component', async () => {
//     render(<App/>);
//     await screen.findByText(/logged in as/i);
//     expect(screen.queryByText(/Searches for React/)).toBeNull();
//     fireEvent.change(screen.getByRole("textbox"),{
//       target: {value: 'React'}
//     });
//     expect(screen.queryByText(/Searches for React/)).toBeInTheDocument();
//   });
// });

//
// describe('events', () => {
//   test('checkbox click', () => {
//     const handleChange = jest.fn();
//     const {container} = render(
//       <input type="checkbox" onChange={handleChange}/>
//     );
//     const checkbox = container.firstChild;
//     expect(checkbox).not.toBeChecked();
//     fireEvent.click(checkbox);
//     expect(handleChange).toHaveBeenCalledTimes(1);
//     expect(checkbox).toBeChecked();
//   });
//
//   test("input focus", () => {
//     const { getByTestId } = render(
//       <input type="text" data-testid="simple-input" />
//     );
//     const input = getByTestId("simple-input");
//     expect(input).not.toHaveFocus();
//     input.focus();
//     expect(input).toHaveFocus();
//   });
// });


//6 userEvent

describe('App', () => {
  test('renders App component', async () => {
    render(<App/>);
    await screen.findByText(/logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    // fireEvent.change(screen.getByRole("textbox"),{
    //   target: {value: 'React'}
    // });
    userEvent.type(screen.getByRole("textbox"), 'React')
    expect(screen.queryByText(/Searches for React/)).toBeInTheDocument();
  });
});


describe('events', () => {
  test('checkbox click', () => {
    const handleChange = jest.fn();
    const {container} = render(
      <input type="checkbox" onChange={handleChange}/>
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox);
    userEvent.click(checkbox);
    // userEvent.click(checkbox,{ctrlKey: true, shiftKey: true});
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  test('double click', () => {
    const onChange = jest.fn();
    const {container} = render(<input type="checkbox" onChange={onChange}/>);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("focus", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  test("select option", () => {
    const { selectOptions, getByRole, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );

    userEvent.selectOptions(getByRole('combobox'), "1");
    expect(getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(getByRole('combobox'), "2");
    expect(getByText("B").selected).toBeTruthy();
    expect(getByText("A").selected).toBeFalsy();
  });
});