import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test Login Component", () => {
  test("render form with 1 button", async () => {
    // コンポーネントをレンダリングが必要な場合は、render()を使用します。
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("should be failed on email validation", () => {
    // 関数のテストの場合はrender()は不要です。 ただし、render()を使用すると、テストの可読性が向上します。
    const testEmail = "iotassss.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("should be success on email validation", () => {
    const testEmail = "hoge@iotassss.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should be able to submit the form 日本語", () => {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");

    userEvent.type(email, "shincode@gmail.com");
    userEvent.type(password, "12345");
    userEvent.click(submitButton);

    const userInfo = screen.getByText("shincode@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });
});
