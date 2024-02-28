import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "../UserForm";

describe("UserForm", () => {
  test("should render the form", () => {
    render(<UserForm />);
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-btn");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("it calls onUserAdd with the form values when the form is submitted", () => {
    // Create a mock function
    const mock = jest.fn();

    // Try to render my component
    render(<UserForm onUserAdd={mock} />);

    // Find the two inputs and the button
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");

    // Simulate typing in the name
    userEvent.type(nameInput, "John Doe");

    // Simulate typing in the email
    userEvent.type(emailInput, "john.doe@example.com");

    // Find the button and click it
    const submitButton = screen.getByTestId("submit-btn");
    userEvent.click(submitButton);

    // Assertion to make sure 'onUserAdd' gets called with the right email/name
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name: "John Doe", email: "john.doe@example.com" });
  });
});
