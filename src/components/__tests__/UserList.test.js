import { render, screen, within } from "@testing-library/react";
import UserList from "../UserList";

function renderComponent() {
  const users = [
    { name: "John Doe", email: "john.doe@gmail.com" },
    { name: "John Smith", email: "john.smith@example.com" },
  ];

  render(<UserList users={users} />);
  return { users };
}

describe("UserList", () => {
  // Approach 1
  test("render one row per user", () => {
    // Render the component
    renderComponent();

    // Find all the rows in the table
    // screen.logTestingPlaygroundURL();

    const rows = within(screen.getByTestId("users")).getAllByRole("row");

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
  });

  // Approach 2
  test("render one row per user 2", () => {
    // Render the component
    const users = [
      { name: "John Doe", email: "john.doe@gmail.com" },
      { name: "John Smith", email: "john.smith@example.com" },
    ];

    const { container } = render(<UserList users={users} />);

    // Find all the rows in the table
    const rows = container.querySelectorAll("tbody tr");

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2);
  });

  test("render the email and name of the user", () => {
    const { users } = renderComponent();

    for (let user of users) {
      const name = screen.getByRole("cell", { name: user.name });
      const email = screen.getByRole("cell", { name: user.email });

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
    }
  });
});
